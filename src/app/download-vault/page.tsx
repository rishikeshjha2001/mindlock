import { Suspense } from "react";
import DownloadVaultClient from "./DownloadVaultClient";

export const dynamic = "force-dynamic";

export default function DownloadVaultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-slateText-muted">
          <span className="font-mono text-xs">Authenticating Vault Access...</span>
        </div>
      }
    >
      <DownloadVaultClient />
    </Suspense>
  );
}
