<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
    >
      <v-card>
      <form ref="form" @submit="submitData">
          <v-card-title>
          <span class="text-h5">Deliver Mail Address</span>
          </v-card-title>
          <v-card-text>
          <v-container>
            <v-row>
            
              <v-col cols="12">
                <v-text-field
                   label="Email*"
                   id="your_email"
                   v-model="form.email"
                   required
                ></v-text-field>
                <p class="validate">{{ errors.email }}</p>
              </v-col>

            </v-row>
          </v-container>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
           @click.stop="show=false"
          >
            Close
          </v-btn>
          <v-btn
            type="submit"
            color="blue darken-1"
            text
          >
            Submit
          </v-btn>
          </v-card-actions>
      </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import axios from "axios";
export default {
  props: ['visible', 'logoSrc','logoType', 'type' ],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  data: () => ({
        errors: {
          email: "",
        },
        form: {
          email: "",
        },
    }),
  methods: {
    validEmail() {
      const text = this.form.email;
      let reg = /^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(text)) {
        document.getElementById("your_email").style.borderColor = "green";
        return true;
      } else {
        this.errors.email = "Please enter valid email address";
        document.getElementById("your_email").style.borderColor = "red";
        return false;
      }
    },
     dataURLtoFile(dataUrl, filename) {
        
        let arr = dataUrl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let  n = bstr.length
        let u8arr = new Uint8Array(n);       
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    },
    submitData(e) {
        e.preventDefault();
        let url = "";
        let fileName = "";
        const formData = new FormData()

        if(this.type === "png"){
          fileName = `${this.logoSrc.name}byDecabits.png`
          url = this.logoSrc.pngUrl
        }
        if(this.type === "svg"){
          fileName = `${this.logoSrc.name}byDecabits.svg`
          url = this.logoSrc.svgUrl
        }
        if(this.type === "jpg"){
          fileName = `${this.logoSrc.name}byDecabits.jpg`
          url = this.logoSrc.jpgUrl
        }
        if(this.type === "transparentPngUrl"){
          fileName = `${this.logoSrc.name}byDecabits.png`
          url = this.logoSrc.transparentPngUrl
        }
        
        if (this.errors.email == "" && this.validEmail() == true ) {
            const logo = this.dataURLtoFile(url, fileName, this.type === "svg")
            formData.append("to",this.form.email);
            formData.append("text",`Your Logo ${fileName}`) ;
            formData.append("attachments",logo) ;
            axios
              .post("https://db-node-mail-service.herokuapp.com/api/email", formData, {
                headers: {
                  'Content-Type': `multipart/form-data`
                },
              })
              .then((res) => {
                this.show = false;
                window.console.log(res.data);
              });    
           
        }
      }
    }
  
}
</script>

<style>
.validate {
  text-align: left;
  font-size: 10px;
  margin: 0 auto;
  color: red;
}
</style>
