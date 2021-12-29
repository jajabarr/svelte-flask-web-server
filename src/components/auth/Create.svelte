<script lang="ts">
  import { serverCreate } from '../../server-api/server-utils';
  import { userObservable } from '../../stores';

  let username: string;
  let password: string;
  let confirm: string;

  async function createAccount() {
    const result = await serverCreate(username, password);

    if (result.name) {
      userObservable.signIn({
        name: result.name,
        sessionId: result.sessionId
      });
    }
  }
</script>

<div class="container" id="create-account">
  <h1 class="title">Create Storage Account</h1>
  <div class="container form">
    <label>
      Username:
      <input bind:value={username} name="username" />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} name="password" />
    </label>
    <label>
      Confirm Password:
      <input type="password" bind:value={confirm} name="confirm-password" />
    </label>
    <button class="submit" on:click={createAccount}>Create Account</button>
  </div>
</div>

<style>
  .title {
    margin-bottom: 5rem;
  }

  .submit {
    align-self: end;
    cursor: pointer;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100%;
    width: 100%;
  }

  .form {
    align-items: end;
    height: initial;
    width: initial;
  }
</style>
