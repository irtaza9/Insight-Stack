## UIColor Extension for Hexadecimal Initialization

## Purpose
This extension for UIColor in Swift provides a convenient way to initialize colors using hexadecimal values.

# Usage
### code-snippet
```swift
extension UIColor {
    
    convenience init(hex: String, alpha: CGFloat = 1.0) {
        var hexValue = hex.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines).uppercased()

        if hexValue.hasPrefix("#") {
            hexValue.remove(at: hexValue.startIndex)
        }

        var rgbValue: UInt64 = 0
        Scanner(string: hexValue).scanHexInt64(&rgbValue)

        let red = CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0
        let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0
        let blue = CGFloat(rgbValue & 0x0000FF) / 255.0

        self.init(red: red, green: green, blue: blue, alpha: alpha)
    }
    
}
```

## How to Use

1. **Add Extension**: Add the provided extension code snippet to your Swift project.
2. **Initialization**: Initialize UIColor objects using hexadecimal values as shown below:

```swift
let color = UIColor(hex: "#FF0000")
```

## Algorithm Explanation

1. **Trimming Whitespace**: The input hexadecimal string is trimmed of leading and trailing whitespaces and newline characters.
2. **Removing '#' Prefix**: If the string begins with '#', it is removed to extract the pure hexadecimal value.
3. **Scanning Hex Value**: The hexadecimal string is scanned to obtain its integer representation.
4. **Extracting RGB Components**: The RGB components (red, green, and blue) are extracted from the integer value using bit masking and shifting operations.
5. **Normalization**: Each component value is divided by `255.0` to normalize it to the range [0, 1].
6. **Initialization**: The `UIColor` instance is initialized with the extracted RGB components and optional alpha value.
