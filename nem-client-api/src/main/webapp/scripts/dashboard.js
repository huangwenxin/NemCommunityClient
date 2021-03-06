"use strict";

 define(['jquery', 'ncc', 'NccLayout', 'Utils'], function($, ncc, NccLayout, Utils) {
    return $.extend(true, {}, NccLayout, {
        name: 'dashboard',
        url: 'dashboard.html',
        template: 'rv!layout/dashboard',
        parent: 'wallet',
        setupOnce: function() {

            // Charts
            /*
            var nemValueDataSource = [
                { month: 'Jan', BTC: 1000, USD: 2315, EUR: 3132 },
                { month: 'Feb', BTC: 3232, USD: 1234, EUR: 3164 },
                { month: 'Mar', BTC: 3146, USD: 4231, EUR: 4314 },
                { month: 'Apr', BTC: 2426, USD: 4321, EUR: 1243 },
                { month: 'May', BTC: 4323, USD: 3264, EUR: 1844 },
                { month: 'Jun', BTC: 3754, USD: 3316, EUR: 2156 },
                { month: 'July', BTC: 3421, USD: 2312, EUR: 1243 },
                { month: 'Aug', BTC: 2978, USD: 3569, EUR: 3128 }
            ];

            var btcSeries = { name: 'BTC', valueField: 'BTC', point: { color: '#074661', size: 4 } };
            var usdSeries = { name: 'USD', valueField: 'USD', point: { color: '#074661', size: 4 } };
            var eurSeries = { name: 'EUR', valueField: 'EUR', point: { color: '#074661', size: 4 } };
            var series = {
                btc: btcSeries,
                usd: usdSeries,
                eur: eurSeries
            }

            var $nemValueChart = $('#nem-value-chart');

            $nemValueChart.dxChart({
                dataSource: nemValueDataSource,
                series: btcSeries,
                commonSeriesSettings: {
                    argumentField: 'month',
                    color: '#27d782',
                    width: 1
                },
                tooltip: {
                    enabled: true,
                    font: {
                        size: 11,
                        color: '#fff'
                    }
                },
                legend: {
                    visible: false
                }
            });

            var chart = $nemValueChart.dxChart("instance");

            $('#nem-value-unit-chooser').change(function() {
                var selected = this.options[this.selectedIndex].value;
                chart.option({
                    series: series[selected]
                });
            });*/
        },
        setupEverytime: function() {
            var local = this.local;
            local.$dashboard = $('.js-dashboard');

            require(['gridster'], function() {
                local.$dashboard.gridster({
                    widget_margins: [10, 9],
                    widget_base_dimensions: [294, 187],
                    max_cols: 3,
                    /*draggable: {
                        handle: 'div.dragger'
                    }*/
                }).data('gridster').disable(); //disable tiles drag & drop
            });

            local.listeners.push(ncc.on({
                activateRemoteHarvesting: function() {
                    var fields = [
                        {
                            name: 'wallet',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.activateRemote.wallet')
                            }
                        },
                        {
                            name: 'account',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.activateRemote.account')
                            }
                        },
                        {
                            name: 'warning',
                            type: 'none',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.activateRemote.warning')
                            },
                            sublabel: {
                                content: "<span class='sublabelWarning'>" +
                                    ncc.get('texts.modals.activateRemote.warningText')
                                    + "</span>",
                                // using nullContent is a hack to force processing of html tags in content
                                nullContent: true
                            }
                        },
                        {
                            name: 'fee',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.common.fee')
                            }
                        },
                        {
                            name: 'hoursDue',
                            type: 'text',
                            label: {
                                content: ncc.get('texts.common.hoursDue')
                            }
                        },
                        {
                            name: 'password',
                            type: 'password',
                            label: {
                                content: ncc.get('texts.modals.activateRemote.password')
                            }
                        }
                        ];
                    ncc.showInputForm(ncc.get('texts.modals.activateRemote.title'), '',
                        fields,
                        {
                            wallet: ncc.get('wallet.wallet'),
                            account: ncc.get('activeAccount.address'),
                            hoursDue: 1,
                            fee: 6
                        },
                        function(values, closeModal) {
                            values.hoursDue = parseInt(values.hoursDue, 10);
                            ncc.postRequest('wallet/account/remote/activate', values, function(data) {
                                closeModal();
                            }, {
                                complete: function() {
                                    ncc.refreshAccount();
                                }
                            });
                        },
                        ncc.get('texts.modals.activateRemote.activate')
                    );
                },
                deactivateRemoteHarvesting: function() {
                    var fields = [
                        {
                            name: 'wallet',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.deactivateRemote.wallet')
                            }
                        },
                        {
                            name: 'account',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.deactivateRemote.account')
                            }
                        },
                        {
                            name: 'fee',
                            type: 'text',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.common.fee')
                            }
                        },
                        {
                            name: 'hoursDue',
                            type: 'text',
                            label: {
                                content: ncc.get('texts.common.hoursDue')
                            }
                        },
                        {
                            name: 'warning',
                            type: 'none',
                            readonly: true,
                            unimportant: true,
                            label: {
                                content: ncc.get('texts.modals.deactivateRemote.warning')
                            },
                            sublabel: {
                                content: "<span class='sublabelWarning'>" +
                                    ncc.get('texts.modals.deactivateRemote.warningText')
                                    + "</span>",
                                // using nullContent is a hack to force processing of html tags in content
                                nullContent: true
                            }
                        },
                        {
                            name: 'password',
                            type: 'password',
                            label: {
                                content: ncc.get('texts.modals.deactivateRemote.password')
                            }
                        },
                    ];
                    ncc.showInputForm(ncc.get('texts.modals.deactivateRemote.title'), '',
                        fields,
                        {
                            wallet: ncc.get('wallet.wallet'),
                            account: ncc.get('activeAccount.address'),
                            hoursDue: 1,
                            fee: 6
                        },
                        function(values, closeModal) {
                            values.hoursDue = parseInt(values.hoursDue, 10);
                            ncc.postRequest('wallet/account/remote/deactivate', values, function(data) {
                                closeModal();
                            }, {
                                complete: function() {
                                    ncc.refreshAccount();
                                }
                            });
                        },
                        ncc.get('texts.modals.deactivateRemote.deactivate')
                    );
                }
            }));

            ncc.refreshAccount();

            /*require(['scroller'], function() {
                $('.scrollable').scroller();
            });

            require(['selecter'], function() {
                $('select').selecter();
            });

            require(['tinycarousel'], function() {
                $('.tile.news .news-preview').tinycarousel({
                    axis: 'y',
                    buttons: false,
                    bullets: true,
                    interval: true,
                    intervalTime: 4000,
                    animationTime: 700
                });
                $('.tile.messages .message-preview').tinycarousel({
                    axis: 'y',
                    buttons: false,
                    interval: true,
                    intervalTime: 4000,
                    animationTime: 700
                });
            });*/
        }
    });
});