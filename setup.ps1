# Git 설정
if (Test-Path .gitmessage) {
    Write-Host "Configuring Git commit template..."
    git config commit.template .gitmessage
}

Write-Host "Setup complete!"
