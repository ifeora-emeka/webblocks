

# MortarStudio - Website Builder

MortarStudio is a website builder that uses Chakra UI for element rendering. Each element has a unique identifier structure and a hierarchical organization based on parent-child relationships.

### Element Structure

Each element includes the following properties:

- **Unique ID**: A unique identifier for each element.
- **Index**: Specifies the order of the element.
- **HTML Tag Type**: Defines the HTML tag type for the element.
- **Parent ID**: References the parent element, establishing parent-child relationships.

### Renderer Context

The renderer context manages the state for each page, including:

- **List of Elements**: Stores all elements for the active page.
- **Active/Selected Elements**: Tracks currently active or selected elements.
- **Element Manipulation Functions**: Provides functions to modify elements within the context.

### Compiler Function

The compiler function organizes the array of elements for a given page into a single, nested object. This object structure represents the hierarchical, parent-child relationships of each element, creating a cohesive layout.

