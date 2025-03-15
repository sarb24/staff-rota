export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container flex flex-col gap-4 py-4 md:py-6 px-4 md:px-6">
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="text-center text-xs md:text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Your Company
            </a>
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 