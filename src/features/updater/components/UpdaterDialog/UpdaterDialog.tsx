import { useUpdater } from "../../hooks/useUpdater";
import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";

const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

export function UpdaterDialog() {
  const { status, update, progress, error, dismiss, handleUpdate } = useUpdater();

  const isOpen = status !== "idle";
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          dismiss();
        }
      }}
    >
      <DialogContent className="sm:max-w-106.25">
        {status === "checking" ? (
          <>
            <DialogHeader>
              <DialogTitle>Checking for Updates</DialogTitle>
              <DialogDescription>
                Please wait while we check for the latest version...
              </DialogDescription>
            </DialogHeader>
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </>
        ) : status === "up-to-date" ? (
          <>
            <DialogHeader>
              <DialogTitle>Up to Date</DialogTitle>
              <DialogDescription>
                You are already running the latest version of QLIMS.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={dismiss}>Close</Button>
            </DialogFooter>
          </>
        ) : status === "error" && !update ? (
          <>
            <DialogHeader>
              <DialogTitle>Update Failed</DialogTitle>
              <DialogDescription className="text-destructive mt-2">{error}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={dismiss}>
                Dismiss
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Update Available 🎉</DialogTitle>
              <DialogDescription>
                Version <strong className="text-foreground">{update?.version}</strong> is ready. You
                are on <strong className="text-foreground">{update?.currentVersion}</strong>.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {update?.body && (
                <div className="text-sm">
                  <p className="font-semibold mb-2">Release Notes:</p>
                  <pre className="p-3 bg-muted rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground border border-border max-h-40">
                    {update.body}
                  </pre>
                </div>
              )}

              {status === "error" && (
                <p className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20">
                  {error}
                </p>
              )}

              {status === "downloading" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>
                      Downloading {progress.percent !== null ? `— ${progress.percent}%` : "..."}
                    </span>
                    {progress.contentLength !== null && (
                      <span className="text-muted-foreground">
                        {toMB(progress.downloaded)} / {toMB(progress.contentLength)} MB
                      </span>
                    )}
                  </div>
                  <progress
                    className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary transition-all duration-300"
                    value={progress.contentLength ? progress.downloaded : undefined}
                    max={progress.contentLength ?? undefined}
                  />
                </div>
              )}

              {status === "installing" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Installing update...</p>
                  <progress className="w-full h-2 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary animate-pulse" />
                </div>
              )}
            </div>

            {(status === "available" || status === "error") && (
              <DialogFooter>
                <Button variant="outline" onClick={dismiss}>
                  Later
                </Button>
                <Button onClick={handleUpdate}>
                  {status === "error" ? "Retry" : "Update Now"}
                </Button>
              </DialogFooter>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
