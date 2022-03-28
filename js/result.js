var app = new Vue({
  el: "#app",
  data() {
	  this.getLocalData();
    return {
		description: this.description,
		userName: this.userName,
		address: this.address,
		zone_id: this.zone_id,
		mdf: false,
		req: {
			name: "",
			address: "",
			zone_id: "",
			status: "",
		},
		search_loading: false,
		search_done: false,
		send_status: "",
		send_loading: false,
		send_done: false,
		send_ok: false
    };
  },
  beforeMount(){
	  this.getLocalData();
  },
  methods: {
	  getLocalData() {
		  this.description = localStorage.getItem("description");
		  this.userName = localStorage.getItem("userName");
		  this.address = localStorage.getItem("address");
		  this.zone_id = localStorage.getItem("zone_id");
    },
	storeLocalData() {
		  localStorage.setItem("description", this.description);
		  localStorage.setItem("userName", this.userName);
		  localStorage.setItem("address", this.address);
		  localStorage.setItem("zone_id", this.zone_id);
    },
  },
});

