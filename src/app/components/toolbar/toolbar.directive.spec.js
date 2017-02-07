(function() {
  'use strict';

  describe('toolBar directive', function(){
    var vm;
    var el;


    beforeEach(module('adminApp'));
    beforeEach(inject(function($compile, $rootScope) { // before the $compile and $rootScope are injected


      el = angular.element('<tool-bar type="bringers" actions="bringers.actions" on-change="bringers.alertMe(data)"></tool-bar>'); //el is the search bar

      $compile(el)($rootScope.$new()); //compiles an html string or DOM into a template / also creates new instance of rootScope.Scope that inherent from $rootScope
      $rootScope.$digest(); //
      vm = el.isolateScope().vm;

    }));

    it('should be compiled', function() {  // it should be compiled function expects el to not return null
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() { //it should isolate the scope object with instanciate members
      expect(vm).toEqual(jasmine.any(Object)); //expect search to equal search Object
    });
    describe('vm.today',function(){
      beforeEach(inject(function(){
        vm.today();
      }));
      it('should return the date of today',function(){
        expect(vm.dt).toEqual(new Date());
      })
    });
    describe('vm.clear',function(){
      beforeEach(inject(function(){
        vm.clear();
      }));
      it('should return a null date',function(){
        expect(vm.dt).toEqual(null);
      });
    });
    describe('vm.dateOptions',function(){
      it('dateDisabled is a function',function(){
        expect(vm.dateOptions.dateDisabled).toEqual(jasmine.any(Function))
      });
      it('formatYear is a string',function(){
        expect(vm.dateOptions.formatYear).toEqual(jasmine.any(String))
      });
      it('the date cannot exceed 5/22/2020',function(){
        expect(vm.dateOptions.maxDate).toEqual(new Date(2020,5,22))
      });
      it('the date cannot be before today',function(){
        expect(vm.dateOptions.minDate).toEqual(new Date())
      });
      it('startingDay must equal 1',function(){
        expect(vm.dateOptions.startingDay).not.toBeLessThan(1)
      });
    });
    describe('vm.toggleMin',function(){
      beforeEach(inject(function(){
        vm.toggleMin()
      }));
      it('unable to pass a null value in date',function(){
        expect(vm.inlineOptions.minDate).not.toEqual(null);
      });
      it('date options equals inline options',function(){
        expect(vm.dateOptions.minDate).toEqual(vm.inlineOptions.minDate)
      })
    });
    describe('vm.open1',function(){
      beforeEach(inject(function(){
        vm.open1()
      }));
      it('1st popup opens',function(){
        expect(vm.popup1.opened).toEqual(true);
      });
    });
    describe('vm.open2',function(){
      beforeEach(inject(function(){
        vm.open2()
      }));
      it('2nd popup opens',function(){
        expect(vm.popup2.opened).toEqual(true)
      })
    });
    describe('vm.setDate',function(){
      var day  = 1;
      var month = 12;
      var year = 2018;
      beforeEach(inject(function(){
        vm.setDate(year,month,day)

      }));
      it('the date should have the year,month & day format',function(){
        expect(vm.dt).toEqual(new Date(year,month,day))
      })
    })
  })
})();
