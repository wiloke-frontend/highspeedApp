<@received>
  const data = getData("app-home-page");
  const result = data.data[0];
  return result;
</@received>

<@expected>
{
  "endpoint": "terms",
  "moduleType": "appCategories",
  "uid": "uid-1581075245828",
  "general": {
    "catSliderStyle": "appCategories",
    "heading": "Categories 1",
    "description": "",
    "headingStyle": "style5",
    "backgroundModule": "#fff",
    "isLazy": true,
    "container": true,
    "a": "a",
    "maxPosts": 406
  },
  "params": {
    "postType": "post",
    "numberOfPosts": 6,
    "orderby": "post_title",
    "taxonomy": {
      "category": [
        44,
        2,
        11,
        67
      ]
    },
    "a": "a"
  },
  "navigation": {
    "endpoint": "navigation",
    "params": {
      "id": 5257,
      "moduleOrder": 0,
      "type": "self"
    }
  }
}
</@expected>
