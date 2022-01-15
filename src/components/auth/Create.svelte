<script lang="ts">
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    import { serverAuth } from "../../server-api/server-utils";
    import { userObservable } from "../../stores";

    let username: string;
    let password: string;
    let confirm: string;

    let error: boolean = false;
    let errorMsg: string = "";

    let create: boolean = false;

    async function createAccount() {
        error = create && password !== confirm;

        if (error) {
            errorMsg = "Both passwords must be the same.";
            return;
        }

        const [result, message] = await serverAuth(
            create ? "create" : "login",
            username,
            password
        );

        errorMsg = message;

        if (error || errorMsg) {
            return;
        }

        if (result.name) {
            userObservable.signIn({
                name: result.name,
                sessionId: result.sessionId,
            });
        }
    }

    function toggleCreate() {
        create = !create;
    }

    const options = ["username", "password", "confirm", "submit", "type"];
</script>

<div class="container" id="create-account">
    <h1 class="title">Create Storage Account</h1>
    <div class="container form">
        <label>
            Username:
            <input bind:value={username} required type="text" name="username" />
        </label>
        <label>
            Password:
            <input
                bind:value={password}
                required
                type="password"
                name="password"
            />
        </label>
        {#if create}
            <label>
                Confirm Password:
                <input
                    bind:value={confirm}
                    required
                    class:error-border={error}
                    class:shake={error}
                    type="password"
                    name="confirm-password"
                />
            </label>
        {/if}
        <button on:click={createAccount} class="submit"
            >{create ? "Create Account" : "Sign In"}</button
        >
        <button class="text-button" on:click={toggleCreate}>
            {create
                ? "Already have an account? Sign in instead!"
                : "Don't have an account? Sign up instead!"}
        </button>
    </div>
    {#if errorMsg}
        <p class="error-text">{errorMsg}</p>
    {/if}
</div>

<style>
    input {
        border: 0.1rem solid black;
        border-radius: 0.3rem;
        padding: 0.1rem 0.5rem 0.1rem 0.5rem;
    }

    button {
        cursor: pointer;
    }

    .title {
        margin-bottom: 5rem;
    }

    .submit {
        align-self: end;
        cursor: pointer;
    }

    .text-button {
        border: none;
        background-color: inherit;
        font-size: 0.8rem;
        font-style: italic;
    }

    .text-button:hover {
        color: #ff3e00;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        margin-top: 5rem;
        gap: 1rem;
        height: 100%;
        width: 100%;
    }

    .form {
        align-items: end;
        height: initial;
        width: initial;
    }

    .error-text {
        color: red;
        font-size: 0.8rem;
    }
    .error-border {
        border: 0.1rem solid red;
    }

    .shake {
        animation-name: spring;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: linear;
    }

    input:focus.error-border {
        outline: 0.1rem solid red;
    }

    @keyframes spring {
        from {
            transform: translateX(0%);
        }

        12%,
        88% {
            transform: translateX(2.5%);
        }

        25%,
        75% {
            transform: translateX(-2.5%);
        }

        50% {
            transform: translateX(0%);
        }

        to {
            transform: translateX(0%);
        }
    }
</style>
