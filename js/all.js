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
           url: "https://script.google.com/macros/s/AKfycbwRxIW5c-RPBmfLAHcZRauHq_z6TzrCkw-fYOXzLP54BFPQtIxb/exec",
         })
           .then((res) => {
             console.log(res);
			 this.description = res.data;
			})
           .catch(function (err) {
             console.error(err);
           });
      //this.address = "我的地址";
    },
    searchUser() {
		this.search_loading = true;
		this.search_done = false;
      /* 
        搜尋user地址    
        post api 要放的地方
        */
		
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
    confirmUser() {
		this.send_loading = true;
		this.send_done = false;
      /* 
          送出user的姓名+地址
          */
		this.req.name = this.userName;
		if (!this.mdf) this.req.zone_id = this.zone_id;
		if (!this.mdf) this.req.address = this.address;
	  
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
           .catch(function (err) {
             console.error(err);
           });
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