<template>
  <v-container style="display:flex;flex-direction:column;min-height:100vh;">
    <v-container>
      <v-row class="form">
        <v-col md="10" class="form__title">
          <!-- <h2 v-if="!logoArray.length">{{ cms.edit.firstTitle }}</h2>
          <h2 v-else>{{ cms.edit.title }}</h2> -->
          <img :src="websitelogo" alt="" />
        </v-col>
        <v-col md="2">
          <v-btn class="form__button-new-logo" @click="saveLogoObject"
            >New Logo</v-btn
          >
        </v-col>
        <v-col
          class="form__cards-container col-12"
          md="4"
          v-for="(item, i) in logoArray"
          :key="i"
        >
          <v-card
            flat
            outlined
            class="form__cards-container__card"
            @click="updateLogo(i)"
          >
            <v-list-item>
              <v-list-item-avatar class="form__cards-container__card-serial">{{
                item.id
              }}</v-list-item-avatar>
            </v-list-item>
            <v-list-item class="pa-0">
              <div
                class="form__cards-container__card__preview pa-0 ma-0"
                :style="{ 'background-color': item.bgColor }"
              >
                <img :src="item.pngUrl" alt="" />
              </div>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="firstTimeVisitTitle" style="flex-grow:1">
      <v-row>
        <v-col v-if="!logoArray.length">
          <h2>{{ cms.edit.firstTimeVisitTitle }}</h2>
        </v-col>
      </v-row>
    </v-container>
    <div class="box">
      <div class="contact-us-wrapper">
        <div class="def">
          <h3>Need help in executing perfect customization for your logo?</h3>
          <!-- <button>Buid your dream</button> -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <!-- <v-btn v-on="on">Open Dialog</v-btn> -->
              <button v-on="on">Buid your dream</button>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Custom Logo Request</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="form.name"
                        label="Full Name*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="form.message"
                        label="Business Name*"
                        hint="or Website link"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="form.email"
                        label="Email*"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="form.contact"
                        label="Contact*"
                        type="number"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white darken-1" text @click="dialog = false"
                  >Close</v-btn
                >
                <v-btn color="white darken-1" text @click="submit">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="abc">
          <h4>Contact US</h4>
          <h5>Mail us with your business name at</h5>
          <p style="margin-top:2px;">info@decabits.com</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Logo from "../../../models/logo";
import Storage from "../../../services/storage";
import cms from "../../../common/data/messages.json";
import websitelogo from "../../../../images/Logomaker_LabDecabits.png";
import logoimage from "../../../../images/Labdecabits_Labdecabits.png";

const storage = new Storage();

export default {
  data: () => ({
    logoArray: storage.getAll(),
    cms: cms,
    logoimage: logoimage,
    dialog: false,
    websitelogo: websitelogo,
    form: { name: "", email: "", contact: "", message: "" },
  }),
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log(this.form);
      if (this.form.name && this.form.email) {
        // let newData = {
        //   your_name: this.form.name,
        //   contact_submitted: this.form.contact ? "yes" : "no",
        //   your_email: this.form.email,
        //   your_message: this.form.message + "\n" + this.form.contact,
        // };
        // const formData = new FormData();
        // for (const name in newData) {
        //   formData.append(name, newData[name]);
        // }
        // fetch("http://blog.entnetwrk.com/contact.php", {
        //   method: "post",
        //   body: formData,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        // })
        //   .then(function(response) {
        //     return response.json();
        //   })
        //   .then(function(res) {

        let newData = {
          your_name: this.form.name,
          contact_submitted: this.form.contact ? "yes" : "no",
          your_email: this.form.email,
          your_message: this.form.message + "\n" + this.form.contact,
        };
        axios
          .post("http://blog.entnetwrk.com/contact.php", newData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res.data);
            alert(
              "Data Submitted Successfully, We will contact you soon :), have a nice day!"
            );
          });
      }
      this.dialog = false;
      this.form = { name: "", email: "", contact: "", message: "" };
    },
    saveLogoObject() {
      const logo = Logo.instance;
      Logo.instance = new Logo({});
      logo.name = "";
      logo.save();
      this.$router.push({ path: "/form" });
    },
    updateLogo(i) {
      const logoSelected = this.logoArray[i];
      storage.set(logoSelected);
      Logo.instance = new Logo(storage.get());
      this.$router.push({ path: "/logo-maker" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./edit.scss";
</style>
