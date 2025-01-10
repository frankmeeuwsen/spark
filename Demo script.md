## Default
```dataviewjs
await dv.view("spark");
```

## Tags
```dataviewjs
await dv.view("spark",{
sourceFolder:"demofolder/tags",
includedTags: ["tonen"],
});
```
## Styling
```dataviewjs
await dv.view("spark",{
buttonText:"🌟 More wisdom!",
linkEmoji: "🪄",
showTitle: true,
maxParagraphs: 1,
addDividers: true
});
```

## Sourcefolder
```dataviewjs
await dv.view("spark",{sourceFolder:"demofolder/alice"});
```