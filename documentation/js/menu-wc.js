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
                    <a href="index.html" data-type="index-link">back documentation</a>
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
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AlertModule.html" data-type="entity-link" >AlertModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' : 'data-target="#xs-controllers-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' :
                                            'id="xs-controllers-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' }>
                                            <li class="link">
                                                <a href="controllers/AlertController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' : 'data-target="#xs-injectables-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' :
                                        'id="xs-injectables-links-module-AlertModule-bac6cc4020502e2cf8436a9d2810bf045116c86940e895bccfce93e8127baf7f32602c65a7cb2772df98d8472542933a129e80c9d89a65e663b58b830765acc5"' }>
                                        <li class="link">
                                            <a href="injectables/AlertService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' : 'data-target="#xs-controllers-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' :
                                            'id="xs-controllers-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' : 'data-target="#xs-injectables-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' :
                                        'id="xs-injectables-links-module-AppModule-0829362e863f6ae2e955f8e6fb7a42653f8e49985b9d93b9b1c0bcc4664e64ae8192ff804fbef48239fd9d0297086f2075e5f800cd45c1e91136ee26a765ff76"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VisitorCounterMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitorCounterMiddleware</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link" >ArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' : 'data-target="#xs-controllers-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' :
                                            'id="xs-controllers-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' }>
                                            <li class="link">
                                                <a href="controllers/ArticleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' : 'data-target="#xs-injectables-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' :
                                        'id="xs-injectables-links-module-ArticleModule-a718f5d169fc4caa51bd35f4fb3509c4300c391bbabdf2eef4dc629d6967392f1627e6e4445dc7406f495c28ae2d183f360c943605d803bc97c511e8a7a71b20"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' : 'data-target="#xs-controllers-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' :
                                            'id="xs-controllers-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PasswordResetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordResetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' : 'data-target="#xs-injectables-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' :
                                        'id="xs-injectables-links-module-AuthModule-7db0eb4cb8cc2416caa385aa3fe7dac1e957433972bab165bf050c66d60f0860f68646b2c314a6a9fa96b6c09a9c5d8c9692f5a107915340286bdfce96578187"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PasswordResetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordResetService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilisateursService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateursService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VisitorCounterMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitorCounterMiddleware</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChatModule-d26ff81770383a98df2a4986b8d2f0a85b44fe1ac2fe5706a3b78f53161f890c50ad51225d6e3eed60b67fc4a342e328d4ce826dc56eb255d4fb06424dec0d13"' : 'data-target="#xs-injectables-links-module-ChatModule-d26ff81770383a98df2a4986b8d2f0a85b44fe1ac2fe5706a3b78f53161f890c50ad51225d6e3eed60b67fc4a342e328d4ce826dc56eb255d4fb06424dec0d13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-d26ff81770383a98df2a4986b8d2f0a85b44fe1ac2fe5706a3b78f53161f890c50ad51225d6e3eed60b67fc4a342e328d4ce826dc56eb255d4fb06424dec0d13"' :
                                        'id="xs-injectables-links-module-ChatModule-d26ff81770383a98df2a4986b8d2f0a85b44fe1ac2fe5706a3b78f53161f890c50ad51225d6e3eed60b67fc4a342e328d4ce826dc56eb255d4fb06424dec0d13"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImagesModule.html" data-type="entity-link" >ImagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' : 'data-target="#xs-controllers-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' :
                                            'id="xs-controllers-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' }>
                                            <li class="link">
                                                <a href="controllers/ImagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' : 'data-target="#xs-injectables-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' :
                                        'id="xs-injectables-links-module-ImagesModule-537b62b0aab8f5c81abb95c743b5d635e54936fb16bf8b60d1e3029131c965704f21874eb2ab8ec37b1a55fd1cf97c1e15bfdab31244afb580cdee318c739f45"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-25977b9172cf958c54f02daac3edc30029c80b418aa7caa2f8d7a45bd156b6ffc5c4efa516022ed210c35f161b30f6253bc4c6c86935647041a0b10f213607c6"' : 'data-target="#xs-injectables-links-module-MailModule-25977b9172cf958c54f02daac3edc30029c80b418aa7caa2f8d7a45bd156b6ffc5c4efa516022ed210c35f161b30f6253bc4c6c86935647041a0b10f213607c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-25977b9172cf958c54f02daac3edc30029c80b418aa7caa2f8d7a45bd156b6ffc5c4efa516022ed210c35f161b30f6253bc4c6c86935647041a0b10f213607c6"' :
                                        'id="xs-injectables-links-module-MailModule-25977b9172cf958c54f02daac3edc30029c80b418aa7caa2f8d7a45bd156b6ffc5c4efa516022ed210c35f161b30f6253bc4c6c86935647041a0b10f213607c6"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' : 'data-target="#xs-controllers-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' :
                                            'id="xs-controllers-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' }>
                                            <li class="link">
                                                <a href="controllers/MessagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' : 'data-target="#xs-injectables-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' :
                                        'id="xs-injectables-links-module-MessagesModule-6616874a49c44d1b74d657f0301dfac1fb43c015f147906a71d2c84518f9c4e7aa2fdad2ee7ebd9a90d2f9b9dd2678df43066712c30855712fd689d84c27bf51"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' : 'data-target="#xs-controllers-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' :
                                            'id="xs-controllers-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' }>
                                            <li class="link">
                                                <a href="controllers/PagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' : 'data-target="#xs-injectables-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' :
                                        'id="xs-injectables-links-module-PagesModule-3620afed949a255289338770f66021c0dc1f373d5460f689728550b3f64380bd0fb6864d216e7396c5ac9fe922889d41af944d38b67645a6e4dde8245324d1e9"' }>
                                        <li class="link">
                                            <a href="injectables/PagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PagesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' : 'data-target="#xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' :
                                        'id="xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilisateursModule.html" data-type="entity-link" >UtilisateursModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' : 'data-target="#xs-controllers-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' :
                                            'id="xs-controllers-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' }>
                                            <li class="link">
                                                <a href="controllers/UtilisateursController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateursController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' : 'data-target="#xs-injectables-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' :
                                        'id="xs-injectables-links-module-UtilisateursModule-b33b5def5af64af3e88ab29eaca0dd4b4d429d5a0700d333641f32771f66c64463456f9daca341f75cf535700714deefb2b78be4389a14c0d033d7f0b11a11fb"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UtilisateursService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateursService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisitorModule.html" data-type="entity-link" >VisitorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' : 'data-target="#xs-controllers-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' :
                                            'id="xs-controllers-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' }>
                                            <li class="link">
                                                <a href="controllers/VisitorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' : 'data-target="#xs-injectables-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' :
                                        'id="xs-injectables-links-module-VisitorModule-cd764ad3327d4d65233456fd9e864ae37fe7263f131153fcfd950f960bf12dde91a6c5d0f91c32333438c996b922296a61353eb9bd6217651f600657633b0d5c"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VisitorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Alert.html" data-type="entity-link" >Alert</a>
                            </li>
                            <li class="link">
                                <a href="classes/Article.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAlertDto.html" data-type="entity-link" >CreateAlertDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArticleDto.html" data-type="entity-link" >CreateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateImageDto.html" data-type="entity-link" >CreateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMessageDto.html" data-type="entity-link" >CreateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePageDto.html" data-type="entity-link" >CreatePageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUtilisateurDto.html" data-type="entity-link" >CreateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVisitorDto.html" data-type="entity-link" >CreateVisitorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetArticleDto.html" data-type="entity-link" >GetArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Image.html" data-type="entity-link" >Image</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/passwordForgotDto.html" data-type="entity-link" >passwordForgotDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/passwordResetDto.html" data-type="entity-link" >passwordResetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaClientExceptionFilter.html" data-type="entity-link" >PrismaClientExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAlertDto.html" data-type="entity-link" >UpdateAlertDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateArticleDto.html" data-type="entity-link" >UpdateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateImageDto.html" data-type="entity-link" >UpdateImageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMessageDto.html" data-type="entity-link" >UpdateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePageDto.html" data-type="entity-link" >UpdatePageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordUtilisateurDto.html" data-type="entity-link" >UpdatePasswordUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUtilisateurDto.html" data-type="entity-link" >UpdateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVisitorDto.html" data-type="entity-link" >UpdateVisitorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utilisateur.html" data-type="entity-link" >Utilisateur</a>
                            </li>
                            <li class="link">
                                <a href="classes/Visitor.html" data-type="entity-link" >Visitor</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});