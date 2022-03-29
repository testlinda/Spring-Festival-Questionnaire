var app = new Vue({
  el: "#app",
  data() {
	  this.getLocalData();
    return {
		thankyou: this.thankyou,		
    };
  },
  beforeMount(){
	  this.getThankyou();
  },
  methods: {
	  getThankyou() {
		 axios({
		   method: "get",
		   url: "https://script.google.com/macros/s/AKfycbz2uriK0JEPFjySOkcJZAWAZb1QQ8E3Ng1tLO6oFfr7b2-K3EdSkxLNtrx9RSdlxemr/exec",
		   params: { type: "thankyou" }
		 })
		   .then((res) => {
			 console.log(res);
			 this.thankyou = res.data;
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
  },
});

