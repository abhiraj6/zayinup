$port = 3000
$path = "c:\Users\adwai\OneDrive\Documents\zayinup\ZAYINUP_Portal"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Output "Listening on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $requestUrl = $context.Request.Url.LocalPath
            if ($requestUrl -eq "/") { $requestUrl = "/index.html" }
            
            $filePath = Join-Path $path $requestUrl.Replace('/', '\')
            $response = $context.Response
            
            if (Test-Path $filePath -PathType Leaf) {
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $content.Length
                
                if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html" }
                elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
                elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
                elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
                elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
                elseif ($filePath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
                
                $response.OutputStream.Write($content, 0, $content.Length)
            }
            else {
                $response.StatusCode = 404
            }
            $response.Close()
        }
        catch {
            Write-Host "Warning: Connection dropped or aborted"
        }
    }
}
finally {
    $listener.Stop()
}
