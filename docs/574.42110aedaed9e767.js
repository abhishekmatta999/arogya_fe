"use strict";(self.webpackChunkarogyaAi=self.webpackChunkarogyaAi||[]).push([[574],{6574:(p,i,l)=>{l.r(i),l.d(i,{WeaklyMealModule:()=>_,routes:()=>c});var r=l(6895),e=l(4650),g=l(2683),s=l(7835);function d(a,t){if(1&a&&(e.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"div",6)(4,"p",7),e._uU(5),e.qZA()()(),e.TgZ(6,"div",8)(7,"div",9)(8,"div",10),e._UZ(9,"fit-outline-header",11),e.ALo(10,"titlecase"),e.qZA(),e.TgZ(11,"div",12)(12,"ul",13)(13,"li")(14,"h6",10),e._uU(15),e.qZA(),e.TgZ(16,"ul",14)(17,"li"),e._uU(18,"Quantity: "),e.TgZ(19,"span"),e._uU(20),e.qZA()(),e.TgZ(21,"li"),e._uU(22,"Calories: "),e.TgZ(23,"span"),e._uU(24),e.qZA()(),e.TgZ(25,"li"),e._uU(26,"Protein: "),e.TgZ(27,"span"),e._uU(28),e.qZA()(),e.TgZ(29,"li"),e._uU(30,"Fiber: "),e.TgZ(31,"span"),e._uU(32),e.qZA()(),e.TgZ(33,"li"),e._uU(34,"Fat: "),e.TgZ(35,"span"),e._uU(36),e.qZA()()()()()()()()()()),2&a){const n=t.$implicit,o=e.oxw().$implicit;e.xp6(5),e.Oqu(null==o?null:o.name),e.xp6(4),e.s9C("headerText",e.lcZ(10,9,null==n?null:n.meal_type)),e.Q6J("margin","0 -1rem"),e.xp6(6),e.Oqu(null==n||null==n.items?null:n.items.name),e.xp6(5),e.Oqu(null==n||null==n.items?null:n.items.quantity),e.xp6(4),e.Oqu(null==n||null==n.items?null:n.items.calories),e.xp6(4),e.Oqu(null==n||null==n.items?null:n.items.protein),e.xp6(4),e.Oqu(null==n||null==n.items?null:n.items.fiber),e.xp6(4),e.Oqu(null==n||null==n.items?null:n.items.fat)}}function m(a,t){if(1&a&&(e.ynx(0),e.YNc(1,d,37,11,"div",2),e.BQk()),2&a){const n=t.$implicit;e.xp6(1),e.Q6J("ngForOf",null==n?null:n.meals)}}let u=(()=>{class a{constructor(n){this.layoutService=n}ngOnInit(){this.fetchPlan()}fetchPlan(){this.layoutService.getWeeklyPlan().subscribe({next:n=>{n.success&&(this.mealPlan=n?.data)}})}}return a.\u0275fac=function(n){return new(n||a)(e.Y36(g.P))},a.\u0275cmp=e.Xpm({type:a,selectors:[["fit-meal-tracking"]],decls:2,vars:1,consts:[[1,"container","container--weakly-meal","d-flex","flex-column"],[4,"ngFor","ngForOf"],["class","row row--meal",4,"ngFor","ngForOf"],[1,"row","row--meal"],[1,"weakly-card","d-flex","flex-row"],[1,"weakly-card__day"],[1,"weakly-card__day__box"],[1,"mb-0"],[1,"weakly-card__content","p-3"],[1,"meal-wise"],[1,"mb-2"],[3,"headerText","margin"],[1,"meal-wise__dish-wrapper","d-flex","flex-column"],[1,"meal-wise__dish"],[1,"meal-wise__info","d-flex","gap-10"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.YNc(1,m,2,1,"ng-container",1),e.qZA()),2&n&&(e.xp6(1),e.Q6J("ngForOf",o.mealPlan))},dependencies:[r.sg,s.R,r.rS],styles:[".my-class[_ngcontent-%COMP%]{font-size:1rem}[_ngcontent-%COMP%]:root{--body: #f6f6f6;--primary-color: #5cab56;--primary-color-light: #d8edd6;--bg-color: #ffffff;--gray-100: #f8f9fa;--gray-200: #dee2e6;--gray-300: #dee2e6;--gray-400: #ced4da;--gray-500: #adb5bd;--gray-600: #6c757d;--gray-700: #495057;--gray-800: #343a40;--gray-900: #212529}.dark-mode[_ngcontent-%COMP%]{--body: #0b141a;--bg-color: #202c33;--text-color: #ffffff;--primary-color: #5cab56;--primary-color-light: #d8edd6;--gray-100: #2e2e2e;--gray-200: #afafaf;--gray-300: #4a4a4a;--gray-400: #5a5a5a;--gray-500: #6b6b6b;--gray-600: #7c7c7c;--gray-700: #8d8d8d;--gray-800: #9e9e9e;--gray-900: #afafaf}.container--weakly-meal[_ngcontent-%COMP%]{gap:2rem}.weakly-card__day[_ngcontent-%COMP%]{width:100px}.weakly-card__day__box[_ngcontent-%COMP%]{background:var(--gray-900);width:calc(100% - 10px);border-radius:.75rem;text-align:center;padding:10px 0;position:sticky;top:100px}.weakly-card__day__box[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:.875rem;color:var(--bg-color)}.weakly-card__day__box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.125rem;color:var(--bg-color);font-weight:600}.weakly-card__content[_ngcontent-%COMP%]{flex:1;background-color:var(--bg-color);border-radius:.75rem;box-shadow:0 4px 8px #0000001a}.meal-wise__dish-wrapper[_ngcontent-%COMP%]{gap:2rem}.meal-wise__dish[_ngcontent-%COMP%]{padding:0;margin:0}.meal-wise__dish[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none}.meal-wise__dish[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{font-size:1.25rem;padding-left:1.5rem}.meal-wise__info[_ngcontent-%COMP%]{padding-left:1.5rem}.meal-wise__info[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:var(--gray-700);font-size:.875rem}.meal-wise__info[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--gray-900);font-weight:600}"]}),a})();var y=l(9197),f=l(3641);const c=[{path:"",component:u}];let _=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[r.ez,f.m,y.Bz.forChild(c)]}),a})()}}]);