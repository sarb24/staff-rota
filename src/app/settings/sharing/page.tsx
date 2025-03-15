"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function SharingPage() {
  const [emailNotifications, setEmailNotifications] = React.useState(false)
  const [slackNotifications, setSlackNotifications] = React.useState(false)
  const [slackWebhook, setSlackWebhook] = React.useState("")

  const handleSave = () => {
    // Save notification settings
    toast.success("Settings saved successfully")
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sharing & Notifications</h1>

        {/* Email Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Schedule Updates</Label>
                <p className="text-sm text-gray-500">
                  Receive email notifications when the schedule is updated
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </div>

        {/* Slack Integration */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Slack Integration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Slack Notifications</Label>
                <p className="text-sm text-gray-500">
                  Send schedule updates to a Slack channel
                </p>
              </div>
              <Switch
                id="slack-notifications"
                checked={slackNotifications}
                onCheckedChange={setSlackNotifications}
              />
            </div>

            {slackNotifications && (
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  type="url"
                  placeholder="https://hooks.slack.com/services/..."
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
} 