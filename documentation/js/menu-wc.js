'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">modernize documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' : 'data-bs-target="#xs-components-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' :
                                            'id="xs-components-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' }>
                                            <li class="link">
                                                <a href="components/AddDiagnosticDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddDiagnosticDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddPatientDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddPatientDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppNavItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlankComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlankComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrandingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FullComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FullComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistogramaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistogramaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' : 'data-bs-target="#xs-pipes-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' :
                                            'id="xs-pipes-links-module-AppModule-4d64163fc457da4bba748db70ae910742229c38701977d15b3c22bc013134a2d032cc6d5a88ff8f6166201bc097222e014c296f6a846ae16181267d4bfcfeef6"' }>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link" >AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthenticationModule-c67125ad25b048b75fec2a584262b7a12e4375b1453c9f2f582edfe8a5a74a95fc134c5435633510cdce451d8f91ac8ecd0654970c74606a09b8cf956d534590"' : 'data-bs-target="#xs-components-links-module-AuthenticationModule-c67125ad25b048b75fec2a584262b7a12e4375b1453c9f2f582edfe8a5a74a95fc134c5435633510cdce451d8f91ac8ecd0654970c74606a09b8cf956d534590"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationModule-c67125ad25b048b75fec2a584262b7a12e4375b1453c9f2f582edfe8a5a74a95fc134c5435633510cdce451d8f91ac8ecd0654970c74606a09b8cf956d534590"' :
                                            'id="xs-components-links-module-AuthenticationModule-c67125ad25b048b75fec2a584262b7a12e4375b1453c9f2f582edfe8a5a74a95fc134c5435633510cdce451d8f91ac8ecd0654970c74606a09b8cf956d534590"' }>
                                            <li class="link">
                                                <a href="components/AppSideLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppSideLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppSideRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppSideRegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExtraModule.html" data-type="entity-link" >ExtraModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExtraModule-f7d085ca59bcf24ca7601657814b4ec21e6c8664c4c33591a989d7e22f2f37ac89214243f45e1751e41d48dd464d1925f0f750844ebdaed89de6c46eafb50081"' : 'data-bs-target="#xs-components-links-module-ExtraModule-f7d085ca59bcf24ca7601657814b4ec21e6c8664c4c33591a989d7e22f2f37ac89214243f45e1751e41d48dd464d1925f0f750844ebdaed89de6c46eafb50081"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExtraModule-f7d085ca59bcf24ca7601657814b4ec21e6c8664c4c33591a989d7e22f2f37ac89214243f45e1751e41d48dd464d1925f0f750844ebdaed89de6c46eafb50081"' :
                                            'id="xs-components-links-module-ExtraModule-f7d085ca59bcf24ca7601657814b4ec21e6c8664c4c33591a989d7e22f2f37ac89214243f45e1751e41d48dd464d1925f0f750844ebdaed89de6c46eafb50081"' }>
                                            <li class="link">
                                                <a href="components/AppIconsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppIconsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppSamplePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppSamplePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PagesModule-3ce06fdae265f784433a689d1725b036f9e341a31341f54feec962c72cd16cb083d82856a87402a8b89a86d9c33d547be66648300438122e7d9c788a18159af8"' : 'data-bs-target="#xs-components-links-module-PagesModule-3ce06fdae265f784433a689d1725b036f9e341a31341f54feec962c72cd16cb083d82856a87402a8b89a86d9c33d547be66648300438122e7d9c788a18159af8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-3ce06fdae265f784433a689d1725b036f9e341a31341f54feec962c72cd16cb083d82856a87402a8b89a86d9c33d547be66648300438122e7d9c788a18159af8"' :
                                            'id="xs-components-links-module-PagesModule-3ce06fdae265f784433a689d1725b036f9e341a31341f54feec962c72cd16cb083d82856a87402a8b89a86d9c33d547be66648300438122e7d9c788a18159af8"' }>
                                            <li class="link">
                                                <a href="components/AppDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UicomponentsModule.html" data-type="entity-link" >UicomponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UicomponentsModule-355a95c4142c50ee4abe3dd2bd1829ae4b810ce9c4ada58e53d0686ed800df01e4be148bc9597b16e8a7a76a6514a5e2245e85571457e91a83423367d14e7ddf"' : 'data-bs-target="#xs-components-links-module-UicomponentsModule-355a95c4142c50ee4abe3dd2bd1829ae4b810ce9c4ada58e53d0686ed800df01e4be148bc9597b16e8a7a76a6514a5e2245e85571457e91a83423367d14e7ddf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UicomponentsModule-355a95c4142c50ee4abe3dd2bd1829ae4b810ce9c4ada58e53d0686ed800df01e4be148bc9597b16e8a7a76a6514a5e2245e85571457e91a83423367d14e7ddf"' :
                                            'id="xs-components-links-module-UicomponentsModule-355a95c4142c50ee4abe3dd2bd1829ae4b810ce9c4ada58e53d0686ed800df01e4be148bc9597b16e8a7a76a6514a5e2245e85571457e91a83423367d14e7ddf"' }>
                                            <li class="link">
                                                <a href="components/AppBadgeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppBadgeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppChipsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppChipsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppListsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppListsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppTooltipsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppTooltipsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ComparisonComponent.html" data-type="entity-link" >ComparisonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDeleteDialogComponent.html" data-type="entity-link" >ConfirmDeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDeleteDialogComponentComponent.html" data-type="entity-link" >ConfirmDeleteDialogComponentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDeleteDialogComponentComponent-1.html" data-type="entity-link" >ConfirmDeleteDialogComponentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DiagnosticIaComponent.html" data-type="entity-link" >DiagnosticIaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RefuerzoComponent.html" data-type="entity-link" >RefuerzoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SurveyDialogComponent.html" data-type="entity-link" >SurveyDialogComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DiagnosticService.html" data-type="entity-link" >DiagnosticService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicalReportService.html" data-type="entity-link" >MedicalReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavService.html" data-type="entity-link" >NavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/NavItem.html" data-type="entity-link" >NavItem</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});