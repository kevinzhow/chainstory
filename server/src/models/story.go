package models

type Story struct {
	Uuid        string   `json:id`
	Author      string   `json:author`
	ParentIds   []string `json:parent_node_ids`
	ChildrenIds []string `json:child_node_ids`
}
