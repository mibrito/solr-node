/**
 * Created by godong on 2016. 3. 9..
 */

/**
 * Require modules
 */
var expect = require('chai').expect,
  Query = require('../lib/query');

describe('Query', function() {
  describe('#dismax', function() {
    it('should get dismax params.', function() {
      //given
      var testQuery = new Query();
      //when
      var query = testQuery.dismax();
      //then
      expect(query.params).to.eql([ 'defType=dismax' ]);
    });
  });

  describe('#edismax', function() {
    it('should get edismax params.', function() {
      //given
      var testQuery = new Query();
      //when
      var query = testQuery.edismax();
      //then
      expect(query.params).to.eql([ 'defType=edismax' ]);
    });
  });

  describe('#q', function() {
    it('should get query params when params is string.', function() {
      //given
      var testQuery = new Query();
      var params = 'text:test';
      //when
      var query = testQuery.q(params);
      //then
      expect(query.params).to.eql([ 'q=text:test' ]);
    });

    it('should get query params when params is object.', function() {
      //given
      var testQuery = new Query();
      var params = {
        text: 'test',
        title: 'test'
      };
      //when
      var query = testQuery.q(params);
      //then
      expect(query.params).to.eql([ 'q=text:test AND title:test' ]);
    });
  });

  describe('#fl', function() {
    it('should get fl params when params is string.', function() {
      //given
      var testQuery = new Query();
      var params = 'text';
      //when
      var query = testQuery.fl(params);
      //then
      expect(query.params).to.eql([ 'fl=text' ]);
    });

    it('should get fl params when params is array.', function() {
      //given
      var testQuery = new Query();
      var params = ['text','title'];
      //when
      var query = testQuery.fl(params);
      //then
      expect(query.params).to.eql([ 'fl=text,title' ]);
    });
  });

  describe('#start', function() {
    it('should get start params when params is number.', function() {
      //given
      var testQuery = new Query();
      var params = 10;
      //when
      var query = testQuery.start(params);
      //then
      expect(query.params).to.eql([ 'start=10' ]);
    });
  });

  describe('#rows', function() {
    it('should get rows params when params is number.', function() {
      //given
      var testQuery = new Query();
      var params = 10;
      //when
      var query = testQuery.rows(params);
      //then
      expect(query.params).to.eql([ 'rows=10' ]);
    });
  });

  describe('#sort', function() {
    it('should get sort params when params is object.', function() {
      //given
      var testQuery = new Query();
      var params = {score:'desc', like:'desc'};
      //when
      var query = testQuery.sort(params);
      //then
      expect(query.params).to.eql([ 'sort=score desc,like desc' ]);
    });
  });

  describe('#fq', function() {
    it('should get fq params when params is object.', function() {
      //given
      var testQuery = new Query();
      var params = {field: 'loc', value: "IsWithin(POLYGON((129.3100483 34.9835815,129.3100483 35.3874414,128.787197 35.3874414,128.787197 34.9835815,129.3100483 34.9835815))) distErrPct=0"};
      //when
      var query = testQuery.fq(params);
      //then
      expect(query.params).to.eql([ "fq=loc:IsWithin(POLYGON((129.3100483 34.9835815,129.3100483 35.3874414,128.787197 35.3874414,128.787197 34.9835815,129.3100483 34.9835815))) distErrPct=0" ]);
    });

    it('should get fq params when params is object.', function() {
      //given
      var testQuery = new Query();
      var params = [{field:'like', value:10}, {field:'hate', value:10}];
      //when
      var query = testQuery.fq(params);
      //then
      expect(query.params).to.eql([ 'fq=like:10', 'fq=hate:10' ]);
    });
  });

  describe('#termsQuery', function() {
    it('should get terms params when params not string and object.', function() {
      //given
      var testQuery = new Query();
      var params = null;
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([]);
    });

    it('should get terms params when params is string.', function() {
      //given
      var testQuery = new Query();
      var params = 'terms=true&terms.fl=text';
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([
        "terms=true&terms.fl=text"
      ]);
    });

    it('should get terms params when params is object.', function() {
      //given
      var testQuery = new Query();
      var params = {
        fl: 'text',
        prefix: 'te'
      };
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([
        "terms=true",
        "terms.fl=text",
        "terms.prefix=te"
      ]);
    });

    it('should get terms params when params is object(on:false).', function() {
      //given
      var testQuery = new Query();
      var params = {
        on: false
      };
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([
        "terms=false"
      ]);
    });

    it('should get terms params when params is object of other params.', function() {
      //given
      var testQuery = new Query();
      var params = {
        fl: 'text',
        lower: 'te',
        lowerIncl: true,
        mincount: 1,
        maxcount: 100
      };
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([
        'terms=true',
        'terms.fl=text',
        'terms.lower=te',
        'terms.lower.incl=true',
        'terms.mincount=1',
        'terms.maxcount=100'
      ]);
    });

    it('should get terms params when params is object of other params2.', function() {
      //given
      var testQuery = new Query();
      var params = {
        fl: 'text',
        regex: '[test]',
        regexFlag: 'literal',
        limit: 10,
        upper: 'te',
        upperIncl: true,
        raw: true,
        sort: 'index'
      };
      //when
      var query = testQuery.termsQuery(params);
      //then
      expect(query.params).to.eql([
        'terms=true',
        'terms.fl=text',
        'terms.regex=[test]',
        'terms.regexFlag=literal',
        'terms.limit=10',
        'terms.upper=te',
        'terms.upper.incl=true',
        'terms.raw=true',
        'terms.sort=index'
      ]);
    });
  });

  describe('#mltQuery', function() {
    it('should get mlt params when params not string and object.', function() {
      //given
      var testQuery = new Query();
      var params = null;
      //when
      var query = testQuery.mltQuery(params);
      //then
      expect(query.params).to.eql([]);
    });

    it('should get mlt params when params is string.', function() {
      //given
      var testQuery = new Query();
      var params = 'q=title:test&mlt.fl=title,text&mlt.mindf=1&mlt.mintf=1';
      //when
      var query = testQuery.mltQuery(params);
      //then
      expect(query.params).to.eql([
        'q=title:test&mlt.fl=title,text&mlt.mindf=1&mlt.mintf=1'
      ]);
    });

    it('should get mlt params when params not string and object.', function() {
      //given
      var testQuery = new Query();
      var params = {
        fl: ['title', 'text'],
        mindf: 1,
        mintf: 1
      };
      //when
      var query =
        testQuery
          .q({title:'test'})
          .mltQuery(params);
      //then
      expect(query.params).to.eql([
        'q=title:test',
        'mlt=true',
        'mlt.fl=title,text',
        'mlt.mintf=1',
        'mlt.mindf=1'
      ]);
    });

    it('should get mlt params when params is object(on:false).', function() {
      //given
      var testQuery = new Query();
      var params = {
        on: false
      };
      //when
      var query = testQuery.mltQuery(params);
      //then
      expect(query.params).to.eql([
        "mlt=false"
      ]);
    });

    it('should get mlt params when params is other params.', function() {
      //given
      var testQuery = new Query();
      var params = {
        fl: 'title',
        maxdf: 1,
        minwl: 3,
        maxwl: 7,
        maxqt: 3,
        maxntp: 2,
        count: 10,
        matchInclude: true,
        matchOffset: 5,
        interestingTerms: 'detail'
      };
      //when
      var query =
        testQuery
          .q({title:'test'})
          .mltQuery(params);
      //then
      expect(query.params).to.eql([
        'q=title:test',
        'mlt=true',
        'mlt.fl=title',
        'mlt.maxdf=1',
        'mlt.minwl=3',
        'mlt.maxwl=7',
        'mlt.maxqt=3',
        'mlt.maxntp=2',
        'mlt.count=10',
        'mlt.match.include=true',
        'mlt.match.offset=5',
        'mlt.interestingTerms=detail'
      ]);
    });

    it('should get mlt params when params is other params2.', function() {
      //given
      var testQuery = new Query();
      var params = {
        boost: false,
        qf: 'title'
      };
      //when
      var query =
        testQuery
          .q('test')
          .mltQuery(params);
      //then
      expect(query.params).to.eql([
        'q=test',
        'mlt=true',
        'mlt.boost=false',
        'mlt.qf=title'
      ]);
    });
  });

});
