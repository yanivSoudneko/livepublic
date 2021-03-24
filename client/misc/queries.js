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
