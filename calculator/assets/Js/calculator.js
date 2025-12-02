      const display = document.getElementById("display");

      function numvalue(value) {
        display.value += value;
      }
      function ClearDisplay() {
        display.value = "";
      }
      function EqualTo() {
        try {
          display.value = eval(display.value);
        } catch {
          display.value = "Undefined";
        }
      }
      function backspace() {
        let display = document.getElementById("display");
        display.value = display.value.slice(0, -1);
      }
      function numvalue(value) {
        const operators = ["+", "-", "*", "/"];

        if (
          operators.includes(value) &&
          operators.includes(display.value.slice(-1))
        ) {
          return;
        }

        display.value += value;
      }