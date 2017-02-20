package disco

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func Test_NewClient(t *testing.T) {
	c := New("https://discovery.rqlite.com")
	if c == nil {
		t.Fatal("failed to create new disco client")
	}

	if c.URL() != "https://discovery.rqlite.com" {
		t.Fatal("configured address of disco service is incorrect")
	}
}

func Test_ClientRegisterBadRequest(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}
		w.WriteHeader(http.StatusBadRequest)
	}))
	defer ts.Close()

	c := New(ts.URL)
	_, err := c.Register("1234", "http://127.0.0.1")
	if err == nil {
		t.Fatalf("failed to receive error on 400 from server")
	}
}

func Test_ClientRegisterNotFound(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}
		w.WriteHeader(http.StatusNotFound)
	}))
	defer ts.Close()

	c := New(ts.URL)
	_, err := c.Register("1234", "http://127.0.0.1")
	if err == nil {
		t.Fatalf("failed to receive error on 404 from server")
	}
}

func Test_ClientRegisterForbidden(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}
		w.WriteHeader(http.StatusForbidden)
	}))
	defer ts.Close()

	c := New(ts.URL)
	_, err := c.Register("1234", "http://127.0.0.1")
	if err == nil {
		t.Fatalf("failed to receive error on 403 from server")
	}
}

func Test_ClientRegisterRequestOK(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}

		if r.URL.String() != "/1234" {
			t.Fatalf("Request URL is wrong, got: %s", r.URL.String())
		}

		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			t.Fatalf("failed to read request from client: %s", err.Error())
		}

		m := map[string]string{}
		if err := json.Unmarshal(b, &m); err != nil {
			t.Fatalf("failed to unmarshal request from client: %s", err.Error())
		}

		if m["addr"] != "http://127.0.0.1" {
			t.Fatalf("incorrect join address supplied by client: %s", m["addr"])
		}

		fmt.Fprintln(w, `{"created_at": "2017-02-17 04:49:05.079125", "disco_id": "68d6c7cc-f4cc-11e6-a170-2e79ea0be7b1", "nodes": ["http://127.0.0.1"]}`)
	}))
	defer ts.Close()

	c := New(ts.URL)
	disco, err := c.Register("1234", "http://127.0.0.1")
	if err != nil {
		t.Fatalf("failed to register: %s", err.Error())
	}
	if len(disco.Nodes) != 1 {
		t.Fatalf("failed to receive correct list of nodes, got %v", disco.Nodes)
	}
}

func Test_ClientRegisterRequestRedirectOK(t *testing.T) {
	ts1 := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}

		if r.URL.String() != "/1234" {
			t.Fatalf("Request URL is wrong, got: %s", r.URL.String())
		}

		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			t.Fatalf("failed to read request from client: %s", err.Error())
		}

		m := map[string]string{}
		if err := json.Unmarshal(b, &m); err != nil {
			t.Fatalf("failed to unmarshal request from client: %s", err.Error())
		}

		if m["addr"] != "http://127.0.0.1" {
			t.Fatalf("incorrect join address supplied by client: %s", m["addr"])
		}

		fmt.Fprintln(w, `{"created_at": "2017-02-17 04:49:05.079125", "disco_id": "68d6c7cc-f4cc-11e6-a170-2e79ea0be7b1", "nodes": ["http://127.0.0.1"]}`)
	}))
	defer ts1.Close()
	ts2 := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, ts1.URL, http.StatusMovedPermanently)
	}))

	c := New(ts2.URL)
	disco, err := c.Register("1234", "http://127.0.0.1")
	if err != nil {
		t.Fatalf("failed to register: %s", err.Error())
	}
	if len(disco.Nodes) != 1 {
		t.Fatalf("failed to receive correct list of nodes, got %v", disco.Nodes)
	}
}

func Test_ClientRegisterFollowerOK(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}
		fmt.Fprintln(w, `{"created_at": "2017-02-17 04:49:05.079125", "disco_id": "68d6c7cc-f4cc-11e6-a170-2e79ea0be7b1", "nodes": ["http://1.1.1.1", "http://2.2.2.2"]}`)
	}))
	defer ts.Close()

	c := New(ts.URL)
	disco, err := c.Register("1234", "http://2.2.2.2")
	if err != nil {
		t.Fatalf("failed to register: %s", err.Error())
	}
	if len(disco.Nodes) != 2 {
		t.Fatalf("failed to receive non-empty list of nodes")
	}
	if disco.Nodes[0] != `http://1.1.1.1` {
		t.Fatalf("got incorrect node, got %v", disco.Nodes[0])
	}
}

func Test_ClientRegisterFollowerMultiOK(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Fatalf("Client did not use POST")
		}
		fmt.Fprintln(w, `{"created_at": "2017-02-17 04:49:05.079125", "disco_id": "68d6c7cc-f4cc-11e6-a170-2e79ea0be7b1", "nodes": ["http://1.1.1.1", "http://2.2.2.2", "http://3.3.3.3"]}`)
	}))
	defer ts.Close()

	c := New(ts.URL)
	disco, err := c.Register("1234", "http://3.3.3.3")
	if err != nil {
		t.Fatalf("failed to register: %s", err.Error())
	}
	if len(disco.Nodes) != 3 {
		t.Fatalf("failed to receive non-empty list of nodes")
	}
	if disco.Nodes[0] != `http://1.1.1.1` {
		t.Fatalf("got incorrect first node, got %v", disco.Nodes[0])
	}
	if disco.Nodes[1] != `http://2.2.2.2` {
		t.Fatalf("got incorrect second node, got %v", disco.Nodes[1])
	}
	if disco.Nodes[2] != `http://3.3.3.3` {
		t.Fatalf("got incorrect third node, got %v", disco.Nodes[1])
	}
}