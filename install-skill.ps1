[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [ValidatePattern('^[a-z0-9][a-z0-9-]*$')]
  [string]$SkillName,

  [string]$SourceRoot = (Join-Path $env:USERPROFILE '.agents\skills'),
  [string]$CopilotRoot = (Join-Path $env:USERPROFILE '.copilot\skills')
)

$source = Join-Path $SourceRoot $SkillName
$target = Join-Path $CopilotRoot $SkillName

if (-not (Test-Path (Join-Path $source 'SKILL.md'))) {
  throw "Skill '$SkillName' was not found or has no SKILL.md at $source."
}

New-Item -ItemType Directory -Path $CopilotRoot -Force | Out-Null

if (Test-Path $target) {
  $item = Get-Item $target -Force
  if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    Write-Output "Already bridged: $target"
    exit 0
  }
  throw "Target already exists and is not a junction: $target"
}

New-Item -ItemType Junction -Path $target -Target $source | Out-Null
Write-Output "Bridged '$SkillName' from $source to $target"
