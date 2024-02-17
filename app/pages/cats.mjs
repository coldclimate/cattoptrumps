export default function cats({ html, state }) {
  const { store } = state
  // 1. Get Problems and values from the store
  const cat = store.cat || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1>New Cat</h1>
    <enhance-form
  action="/cats/${cat.key}"
  method="POST">
${'' /* 3. Overall form error messages */}
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Cat">
${'' /* 4,5,6. Problems, initial values, and validation attributes added */}
  <enhance-text-input label="Name" type="text" id="name" name="name" value="${cat?.name}" errors="${problems?.name?.errors}" required minlength=1 ></enhance-text-input>
  <enhance-text-input label="Size" type="text" id="size" name="size" value="${cat?.size}" errors="${problems?.size?.errors}" required></enhance-text-input>

  <enhance-text-input label="Speed" type="text" id="speed" name="speed" value="${cat?.speed}" errors="${problems?.speed?.errors}" required></enhance-text-input>
  <enhance-text-input label="Tricksiness" type="text" id="tricksiness" name="tricksiness" value="${cat?.tricksiness}" errors="${problems?.tricksiness?.errors}" required></enhance-text-input>
  <enhance-text-input label="fact" type="text" id="fact" name="fact" value="${cat?.fact}" errors="${problems?.fact?.errors}" required></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${cat?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</main>
</enhance-page-container>
  `
}