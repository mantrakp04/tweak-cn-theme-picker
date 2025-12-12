"use client"

import * as React from "react"
import { ThemePicker } from "@/registry/new-york/blocks/tweakcn-theme-picker/tweakcn-theme-picker"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/new-york/ui/tabs"
import { ChevronDown, Copy, ExternalLink, Eye, Github, Mail, Settings, User, Code } from "lucide-react"

const REGISTRY_URL = "https://tweak-cn-theme-picker.vercel.app/r/tweakcn-theme-picker.json"
const INSTALL_CODE_NPM = `npx shadcn@latest add`
const INSTALL_CODE_BUN = `bunx shadcn@latest add`
const INSTALL_CODE_PNPM = `pnpm dlx shadcn@latest add`

const USAGE_CODE = `import { ThemePicker } from "@/registry/new-york/blocks/tweakcn-theme-picker/tweakcn-theme-picker"
import { ThemeProvider } from "@/registry/new-york/blocks/tweakcn-theme-provider/theme-provider"

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <ThemePicker />
      </div>
    </ThemeProvider>
  )
}`

type PackageManager = "npm" | "bun" | "pnpm"

function CodeBlock({ 
  code, 
  title, 
  packageManagers,
  showCopyButton = true
}: { 
  code: string
  title?: string
  packageManagers?: PackageManager[]
  showCopyButton?: boolean
}) {
  const [copied, setCopied] = React.useState(false)
  const [selectedPm, setSelectedPm] = React.useState<PackageManager>("npm")
  
  const getCodeForPm = (pm: PackageManager) => {
    if (pm === "npm") return INSTALL_CODE_NPM
    if (pm === "bun") return INSTALL_CODE_BUN
    if (pm === "pnpm") return INSTALL_CODE_PNPM
    return `${code} ${REGISTRY_URL}`
  }

  const displayCode = packageManagers ? getCodeForPm(selectedPm) : code

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      // Optionally show an error message to the user
    }
  }

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border rounded-t-lg">
          <span className="text-xs font-mono text-muted-foreground">{title}</span>
          {packageManagers && packageManagers.length > 0 && (
            <div className="flex items-center gap-1">
              {packageManagers.map((pm) => (
                <button
                  key={pm}
                  onClick={() => setSelectedPm(pm)}
                  className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                    selectedPm === pm
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="relative group">
        <pre className={`p-4 overflow-x-auto text-sm bg-muted/30 ${title ? '' : 'rounded-lg'} ${title ? 'rounded-b-lg' : ''}`}>
          <code className="font-mono text-xs leading-relaxed">{displayCode}</code>
        </pre>
        {showCopyButton && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-1/2 -translate-y-1/2 right-2 h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            <Copy className="h-3 w-3" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">TweakCN Theme Picker</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A beautiful, feature-rich theme picker for shadcn/ui that integrates with{" "}
                <a
                  href="https://tweakcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline inline-flex items-center gap-1"
                >
                  TweakCN
                  <ExternalLink className="h-3 w-3" />
                </a>
                . Import custom themes, switch between light and dark modes, and preview changes in real-time.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <a
                    href="https://tweakcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://icons.duckduckgo.com/ip3/tweakcn.com.ico"
                      alt="TweakCN"
                      className="h-4 w-4 theme-match-icon"
                    />
                    TweakCN
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/mantrakp04/tweak-cn-theme-picker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Installation Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
            <p className="text-muted-foreground">
              Add the theme picker to your project using the shadcn CLI.
            </p>
          </div>

          <div className="space-y-4">
            <CodeBlock code={INSTALL_CODE_NPM} title="Terminal" packageManagers={["npm", "bun", "pnpm"]} />
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Code className="h-4 w-4" />
                  Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="py-32 rounded-lg bg-muted/50">
                <div className="flex justify-center">
                  <ThemePicker />
                </div>
              </TabsContent>
              <TabsContent value="code">
                <CodeBlock code={USAGE_CODE} showCopyButton={false} />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Preview Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Theme Preview</h2>
            <p className="text-muted-foreground">
              Try switching themes to see how they affect the components below.
            </p>
          </div>

          <div className="space-y-6">
            {/* Button Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  See how different button variants adapt to your selected theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            {/* Form & Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>Form components with theme colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name"/>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                  <CardDescription>Interactive menu component</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Open Menu
                        <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4" />
                        Messages
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
