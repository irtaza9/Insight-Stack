# ErrorManager Class

## Purpose
The `ErrorManager` class provides functionality to manage and display error views in a UIViewController.

## Usage Example
```swift
class ErrorManager {
    private var errorView: ErrorView?
    
    init() {}
    
    func showErrorView(in viewController: UIViewController, withImage image: String, message: String, description: String) {
        if errorView == nil {
            errorView = ErrorView(frame: viewController.view.bounds, imageName: image, message: message, description: description)
            viewController.view.addSubview(errorView!)
        }
        errorView?.isHidden = false
    }
    
    func hideErrorView() {
        errorView?.isHidden = true
    }
}
```

# ErrorView Class

## Purpose
The `ErrorView` class is a custom UIView designed to display error messages and descriptions with an accompanying image.

## Initialization
The `ErrorView` class can be initialized with the following parameters:

- `frame`: The frame for the error view.
- `imageName`: The name of the image to be displayed in the view.
- `message`: The main error message to be displayed.
- `description`: A description providing more details about the error.

## Usage Example
```swift
import Foundation
import UIKit

class ErrorView: UIView {

    private let imageView = UIImageView()
    private let messageLabel = UILabel()
    private let messageDescription = UILabel()

    init(frame: CGRect, imageName: String, message: String, description: String) {
        super.init(frame: frame)
        setupViews(imageName: imageName, message: message, description: description)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupViews(imageName: String, message: String, description: String) {
        imageView.image = UIImage(named: imageName)
        imageView.contentMode = .scaleAspectFit
        addSubview(imageView)

        messageLabel.textAlignment = .center
        messageLabel.numberOfLines = 0
        messageLabel.font = UIFont.boldSystemFont(ofSize: 20)
        messageLabel.text = message
        addSubview(messageLabel)
        
        messageDescription.textAlignment = .center
        messageDescription.numberOfLines = 0
        messageDescription.font = UIFont.systemFont(ofSize: 14)
        messageDescription.textColor = UIColor(hex: "444444")
        messageDescription.text = description
        addSubview(messageDescription)

        imageView.translatesAutoresizingMaskIntoConstraints = false
        messageLabel.translatesAutoresizingMaskIntoConstraints = false
        messageDescription.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            imageView.centerXAnchor.constraint(equalTo: centerXAnchor),
            imageView.centerYAnchor.constraint(equalTo: centerYAnchor, constant: -40),
            imageView.widthAnchor.constraint(equalToConstant: 57),
            imageView.heightAnchor.constraint(equalToConstant: 57),

            messageLabel.topAnchor.constraint(equalTo: imageView.bottomAnchor, constant: 20),
            messageLabel.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            messageLabel.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20),
            
            messageDescription.topAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant: 10),
            messageDescription.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 20),
            messageDescription.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -20)
        ])
    }
}
```
# Error Handling with ErrorManager and ErrorView

## Purpose
The combination of `ErrorManager` and `ErrorView` classes provides a convenient way to handle and display errors in a UIViewController.

## Usage Example
1. **Create ErrorManager Instance**: Create an instance of `ErrorManager` and class the function `showErrorView` by using the instance and pass the `params` that is required to create the `ErrorView`

```swift
let errorManager = ErrorManager()
errorManager.showErrorView(in: self, withImage: "no.data.found", message: "No Data found", description: "You already availed all the products.")
```

## Other
1. **hideErrorView**