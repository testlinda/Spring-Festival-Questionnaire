var app = new Vue({
  el: "#app",
  data() {
    return {
		description: this.description,
		userName: this.userName,
		address: this.address,
		zone_id: this.zone_id,
		req: {
			name: "",
			address: "",
			zone_id: "",
			status: "",
		},
		search_loading: false,
		search_done: false,
		search_ok: false,
		send_loading: false,
		send_done: false,
		send_ok: false
    };
  },
  beforeMount(){
	  this.getLocalData();
	  this.init();
  },
  methods: {
	init() {
		  this.req.zone_id = this.zone_id;
		  this.req.address = this.address;
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
	getZipCode() {
		 this.search_loading = true;
		 this.search_done = false;
		 this.search_ok = false;
         axios({
           method: "get",
           url: "http://zip5.5432.tw/zip5json.py",
		   params: { adrs: this.address },
         })
           .then((res) => {
			 console.log(res.data);
			 this.search_loading = false;
			 this.search_done = true;
			 this.search_ok = (res.data.zipcode6 !== "" || res.data.zipcode !== "");
			 if (this.search_ok) {
				 if (res.data.zipcode6 !== "") {
					this.zone_id = res.data.zipcode6;
				 } else {
					 this.zone_id = res.data.zipcode;
				 }
			 }
           })
           .catch(function (err) {
             console.error(err);
           });
    },
	getZipCodeManually() {
		window.open("https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=208", "_blank");
	},
	gotoResult() {
		this.storeLocalData();
		location.href = "result.html";
	},
  },
});

function enable_send() {
	if(document.getElementById("cb_doublecheck").checked==true) { 
		document.getElementById('btn_confirm').disabled = false;
	} else {
		document.getElementById('btn_confirm').disabled = true;
	}
}