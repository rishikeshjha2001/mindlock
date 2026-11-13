import DownloadVaultClient from "./DownloadVaultClient";

export default async function DownloadVaultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialKey = typeof params?.key === "string" ? params.key : "";

  return <DownloadVaultClient initialKey={initialKey} />;
}
