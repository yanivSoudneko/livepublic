db.getCollection('stay').updateMany({ price: { $exists: false } }, [
    {
        $set: {
            price: {
                $function: {
                    body: function() {
                        return Math.floor(
                            Math.random() * (250 - 120 + 1) + 120
                        );
                    },
                    args: [],
                    lang: 'js',
                },
            },
        },
    },
]);

db.getCollection('stay').aggregate([
    {
        $project: {
            name: 1,
            imgUrls: {
                $cond: {
                    if: { $isArray: '$imgUrls' },
                    then: { $size: '$imgUrls' },
                    else: 'empty',
                },
            },
        },
    },
]);

db.getCollection('stay').find({
    imgUrls: { $size: 0 },
});

db.getCollection('stay').aggregate([
    { $match: { imgUrls: { $size: 0 } } },
    { $count: 'docs with no imgUrls' },
]);
