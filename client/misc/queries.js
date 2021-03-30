db.getCollection('stay').updateMany({ price: { $exists: false } }, [
  {
    $set: {
      price: {
        $function: {
          body: function() {
            return Math.floor(Math.random() * (250 - 120 + 1) + 120);
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
db.getCollection('stay').find({
  imgUrls: { $size: 0 },
  'loc.address': { $regex: 'new york', $options: 'i' },
});

db.getCollection('stay').aggregate([{ $match: { imgUrls: { $size: 0 } } }, { $count: 'docs with no imgUrls' }]);

db.getCollection('stay').aggregate([
  {
    $project: {
      reviews_amount: { $size: '$reviews' },
    },
  },
  {
    $match: {
      reviews_amount: { $gte: 30 },
    },
  },
]);

db.getCollection('stay')
  .aggregate([
    {
      $addFields: {
        reviews_amount: { $size: '$reviews' },
      },
    },
    {
      $match: {
        reviews_amount: { $gte: 30 },
        imgUrls: { $size: 0 },
      },
    },
  ])
  .limit(50);

db.getCollection('order').aggregate([
  {
    $match: {
      $or: [{ 'host._id': '60587461571d864cdcf8921c' }, { 'buyer._id': '60587461571d864cdcf8921c' }],
    },
  },
]);

db.getCollection('stay').aggregate([
  {
    $addFields: {
      reviews_amount: { $size: '$reviews' },
    },
  },
  {
    $match: {
      reviews_amount: { $gte: 30 },
      imgUrls: { $size: 0 },
    },
  },
  { $limit: 50 },
]);

//DO NOT USE!!!
xxx.deleteMany({
  imgUrls: { $size: 0 },
});

//find
db.getCollection('stay').find({ 'loc.address': { $regex: 'new york', $options: 'i' } });
db.getCollection('order').find({ 'host._id': { $regex: '605882438a46640774775bf6', $options: 'i' } });
db.getCollection('stay').find({ amenities: { $regex: 'wifi', $regex: 'tv', $options: 'i' } });
