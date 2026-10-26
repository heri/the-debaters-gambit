// Compile all Pods in Swift 5 language mode so Expo SDK pods work under Xcode 16 / Swift 6.
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withSwift5Pods = (config) => withDangerousMod(config, ['ios', (cfg) => {
  const podfilePath = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
  let src = fs.readFileSync(podfilePath, 'utf8');
  const patch = `
    # Xcode 16 / Swift 6 compatibility: compile pods in Swift 5 language mode.
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_VERSION'] = '5.0'
      end
    end`;
  src = src.replace(/(\n  end\n\nend\s*)$/, `${patch}\n  end\n\nend\n`);
  fs.writeFileSync(podfilePath, src);
  return cfg;
}]);

module.exports = withSwift5Pods;
