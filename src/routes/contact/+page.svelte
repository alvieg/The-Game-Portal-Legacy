<script>
  let name = "";
  let email = "";
  let subject = "";
  let message = "";

  const recipient = "alviegilbert@gmail.com";

  function sendEmail() {
    const body = `
Name: ${name}
Email: ${email}

${message}
    `;

    const mailtoLink =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_blank")
  }
</script>

<div class="min-h-screen flex items-center justify-center px-6 py-16 text-white">
  <div class="w-full max-w-xl bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

    <h1 class="text-3xl font-bold text-center">Contact</h1>

    <input
      type="text"
      placeholder="Your Name"
      bind:value={name}
      class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    />

    <input
      type="email"
      placeholder="Your Email"
      bind:value={email}
      class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    />

    <input
      type="text"
      placeholder="Subject"
      bind:value={subject}
      class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    />

    <textarea
      rows="5"
      placeholder="Your Message"
      bind:value={message}
      class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
    ></textarea>

    <button
      on:click={sendEmail}
      class="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
    >
      Send Message
    </button>

  </div>
</div>
