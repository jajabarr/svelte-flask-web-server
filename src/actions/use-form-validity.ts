export function formValidity(node: HTMLInputElement, { rule, message }) {
    function checkValidity(rule: boolean, message: string) {
        if (!rule) {
            node.setCustomValidity(message);
        } else {
            node.setCustomValidity("");
        }
    }

    return {
        update({ rule, message }) {
            checkValidity(rule, message);
        },
    };
}
