
export const Navbar = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <img
              src="/src/assets/human_interest.png" 
              alt="Company Logo"
              className="h-15 w-15" 
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Human Interest</h1>
            <p className="text-left text-xs text-muted-foreground">401(k) Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Richard Azucenas</p>
            <p className="text-xs text-muted-foreground">ID: EMP-12345</p>
          </div>
        </div>
      </div>
    </header>
  );
};