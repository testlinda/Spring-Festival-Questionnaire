var app = new Vue({
  el: "#app",
  data() {
    return {
		description: "",
		userName: "",
		address: "",
		zone_id: "",
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
	  this.getDescription()
  },
  methods: {
	getDescription() {
		 axios({
		   method: "get",
		   url: "https://script.google.com/macros/s/AKfycbz2uriK0JEPFjySOkcJZAWAZb1QQ8E3Ng1tLO6oFfr7b2-K3EdSkxLNtrx9RSdlxemr/exec",
		 })
		   .then((res) => {
			 console.log(res);
			 this.description = res.data;
			})
		   .catch(function (err) {
			 console.error(err);
		   });
		 
    },
    searchUser() {
		this.search_loading = true;
		this.search_done = false;
		var mydata = JSON.stringify({
				"name": this.userName,
				"action": 'get'
			});
		
		//console.log(mydata);
			
         axios({
           method: "post",
           url: "https://script.google.com/macros/s/AKfycbyjXCFLby4IgY615XkgZfmsKyUWlpQiWhK-sbY2eyUbhHcmZzs/exec",
           data: mydata,
         })
           .then((res) => {
             console.log(res.data);
			 this.zone_id = res.data.zone_id;
			 this.address = res.data.address;
			 this.search_loading = false;
			 this.search_done = true;
			})
           .catch(function (err) {
             console.error(err);
           });
    },
    confirmSend() {
		this.send_loading = true;
		this.send_done = false;
		this.req.name = this.userName;
		this.req.zone_id = this.zone_id;
		this.req.address = this.address;
	  
		var mydata = JSON.stringify({
				"name": this.req.name,
				"zone_id": this.req.zone_id,
				"address": this.req.address,
				"action": 'set'
			});
		
		//console.log(mydata);
         axios({
           method: "post",
           url: "https://script.google.com/macros/s/AKfycbyjXCFLby4IgY615XkgZfmsKyUWlpQiWhK-sbY2eyUbhHcmZzs/exec",
           data: mydata,
         })
           .then((res) => {
			 this.send_status = res.data.status;
			 this.send_ok = (this.send_status === "ok");
			 this.send_loading = false;
			 this.send_done = true;
           })
		   .then(() => {
			   if (this.send_ok) {
				   this.gotoResult();
			   }
		   })
           .catch(function (err) {
             console.error(err);
           });
    },
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
	gotoEdit() {
		this.storeLocalData();
		location.href = "edit.html";
	},
	gotoResult() {
		this.storeLocalData();
		location.href = "result.html";
	},
	gotoNext() {
		if (!this.mdf) {
			this.confirmSend();
		} else {
			this.gotoEdit();
		}		
	},
  },
});

function enable_button() {
	if(document.getElementById("input_username").value==="") { 
		document.getElementById('btn_search').disabled = true; 
		document.getElementById('btn_confirm').disabled = true;
	} else { 
		document.getElementById('btn_search').disabled = false;
		document.getElementById('btn_confirm').disabled = false;
	}
}
