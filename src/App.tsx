import { useState } from "react";
import "./App.css";
import { AppPopup } from "./features/AppPopup/AppPopup";
import { AppButton } from "./shared/ui/AppButton/AppButton";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="app">
      <AppButton
        onClick={() => setIsOpen(true)}
        variant="outlined"
      >
        Расчет платежей
      </AppButton>
      {isOpen && <AppPopup onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default App;
