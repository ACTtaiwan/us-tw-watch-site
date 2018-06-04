<template>
  <div class="privacy-policy">

    <section class="section">
      <div class="section-wrapper">
        <h1 class="section-title">Privacy policy</h1>
        <p class="last-update">Last updated: Feburary 2018</p>

        <div class="block">
          <h2>Information that is gathered from visitors</h2>
          <p>In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit. Cookies may be used to remember visitor preferences when interacting with the website. Where registration is required, the visitor's email and a username will be stored on the server.</p>
        </div>

        <div class="block">
          <h2>How the Information is used</h2>
          <p>The information is used to enhance the visitor's experience when using the website to display personalized content and possibly advertising. E-mail addresses will not be sold, rented or leased to 3rd parties. E-mail may be sent to inform you of news of our services or offers by us or our affiliates.</p>
        </div>

        <div class="block">
          <h2>Visitor Options</h2>
          <p>If you have subscribed to one of our services, you may unsubscribe by following the instructions which are included in e-mail that you receive. You may be able to block cookies via your browser settings but this may prevent you from access to certain features of the website.</p>
        </div>

        <div class="block">
          <h2>Cookies</h2>
          <p>Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. Also they may be used to track your return visits to the website. 3rd party advertising companies may also use cookies for tracking purposes.</p>
        </div>

        <div class="note">
          <p>Taiwan Watch will not (and will not allow any third party to) use the statistical analytics tool to track or to collect any Personally Identifiable Information (PII) of visitors to our site. Google will not associate your IP address with any other data held by Google. Neither we nor Google will link, or seek to link, an IP address with the identity of a computer user. We will not associate any data gathered from this site with any Personally Identifiable Information from any source, unless you explicitly submit that information via a fill-in form on our website.</p>
        </div>

      </div>
    </section>



  </div>
</template>

<script>
export default {
  data () {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.section {
  padding: 40px 0 0 0;

  .section-wrapper {
    @extend .pageWrapper-large;

    .section-title {
      color: $twGrayDark;
      font-size: 1.8em;
      font-weight: $twSemiBold;
    }
  }

  &:last-child {
    margin-bottom: 40px;
  }
}

.last-update {
  margin-bottom: 40px;
}

.block {
  margin-bottom: 20px;
  color: $twGrayDark;

  p {
    font-size: 1em;
  }
}

.note {
  margin-top: 40px;
  color: $twGrayLight;
}
</style>
