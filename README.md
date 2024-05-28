## GPT PROMPTS:

### For rendering chakra ui element as DndElementData
hardcode the above hero section as a DndElementData which is a nested object and a child parent ID references the parent dnd_Id, and an element's children should start with an index of 0. remember to set none chakra ui attributes to attributes and and html_tag should be the "as" props. Make sure it follows the same hierarchy as styling  as the above element

### A hero from scratch
I'm building a website builder using react, chakra ui and redux
import React, { CSSProperties } from "react";
import { BoxProps } from "@chakra-ui/react";


[The designer types goes here]


create a hardcoded DndElementData for a website hero section where the top most object has and id of "root" and you have parent and children and the children index of a parent will start at 0.
the root element will have a section (html_tag) child which will be the hero. The hero will have a child div (html_tag) with a display of flex going from left to right with two children. The first left child will have a div with one head, sub heading and a CTA button. while the right child will have a div with a padding of 4 px and an img tag whos src = "https://pbs.twimg.com/media/ERicQEQXUAE8CJ_.jpg:large"

make sure to style the elements properly to the best of your ability.
