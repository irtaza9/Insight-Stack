# QR Data Formatting

## Purpose
This function `formatData(using qrResult: String)` is designed to parse a QR code result string and extract specific data from it, based on language identifiers and IDs.

## Functionality
The function performs the following steps:
1. Splits the input string `qrResult` into components separated by commas.
2. Iterates through each component.
3. Splits each component further by hyphens to determine language and ID.
4. Stores the IDs corresponding to English and Arabic languages.
5. Depending on the language preference (stored in `SharedManager.manager.isArabicLanguage`), returns either the Arabic or English ID.

## Usage
To use this function:
1. Pass the QR code result string to `formatData(using:)`.
2. The function will return the appropriate ID based on the language preference.

### Example
```swift
let qrResult = "en-1234,ar-5678"
let formattedData = formatData(using: qrResult)
print(formattedData) // Output depends on the language preference

func formatData(using qrResult: String) -> String {
        let components = qrResult.components(separatedBy: ",")
        
        var englishID = ""
        var arabicID = ""
        
        for component in components {
            let parts = component.components(separatedBy: "-")
            if parts.count == 2 {
                let language = parts[0]
                let id = parts[1]
                if language == "en" {
                    englishID = id
                } else if language == "ar" {
                    arabicID = id
                }
            }
        }
        
        if SharedManager.manager.isArabicLanguage {
            return arabicID
        } else {
            return englishID
        }
}
```

### Note

You have to write the localization first and some utility functions that can be accessible accors the app so that you can utilize them when you have the specific need