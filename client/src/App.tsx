import './App.css'

import { Button } from "@/components/ui/button"

function App() {
  return (
    <div>
      <h1>401(k) Contribution Manager</h1>
      <Button onClick={() => alert('Button clicked!')}>
        Save Contribution Rate
      </Button>
    </div>
  );
}

export default App
