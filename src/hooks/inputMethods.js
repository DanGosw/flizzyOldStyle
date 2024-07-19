export function useNumericInput(existingRef) {
    function handleInput(event) {
        const newValue = event.target.value.replace(/\D/g, "");
        existingRef.value = newValue;
        event.target.value = newValue;
    }
    
    return {
        handleInput
    };
}
