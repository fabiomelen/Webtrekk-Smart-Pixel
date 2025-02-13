import React from 'react';
import {shallow, mount} from './../../../enzyme';
import {expectInCallback} from './../../../helper';
import {WebtrekkProductData, WebtrekkSmartPixelReact} from './../../../../src/index';

const reactVersion = parseInt(React.version.split('.')[0]);
let invalidPropIndex = 0;
if (reactVersion > 16) {
    invalidPropIndex = 2;
}

describe('WebtrekkProductData', () => {
    let spyOnError;
    let renderedWebtrekkProductData;

    describe('shallow rendering', () => {
        beforeEach(() => {
            spyOnError = jest.spyOn(console, 'error').mockImplementation(() => {
            });
        });

        afterEach(() => {
            spyOnError.mockRestore();

            spyOnError = null;
        });

        test('ignore wrong type', () => {
            shallow(
                <WebtrekkProductData
                    id={123456789}
                    action={0}
                    cost={{}}
                    quantity={{}}
                    variant={0}
                    soldOut={'false'}
                    parameter={{1: 2}}
                    category={{1: 1}}
                />
            );

            expect(spyOnError).toHaveBeenCalled();
            expect(spyOnError.mock.calls.length).toBe(9);

            expect(spyOnError.mock.calls[0][invalidPropIndex]).toContain('Invalid prop `id` of type `number` supplied to `WebtrekkProductData`, expected `string`');
            expect(spyOnError.mock.calls[1][invalidPropIndex]).toContain('Invalid prop `action` of value `0` supplied to `WebtrekkProductData`, expected one of ["list","view","basket","confirmation"]');
            expect(spyOnError.mock.calls[2][invalidPropIndex]).toContain('Invalid prop `cost` supplied to `WebtrekkProductData`');
            expect(spyOnError.mock.calls[3][invalidPropIndex]).toContain('Invalid prop `quantity` supplied to `WebtrekkProductData`');
            expect(spyOnError.mock.calls[4][invalidPropIndex]).toContain('Invalid prop `variant` of type `number` supplied to `WebtrekkProductData`, expected `string`');
            expect(spyOnError.mock.calls[5][invalidPropIndex]).toContain('Invalid prop `soldOut` of type `string` supplied to `WebtrekkProductData`, expected `boolean`');
            expect(spyOnError.mock.calls[6][invalidPropIndex]).toContain('Invalid prop `parameter.1` of type `number` supplied to `WebtrekkProductData`, expected `string`');
            expect(spyOnError.mock.calls[7][invalidPropIndex]).toContain('Invalid prop `category.1` of type `number` supplied to `WebtrekkProductData`, expected `string`');
        });

        test('required props', () => {
            shallow(<WebtrekkProductData/>);

            expect(spyOnError).toHaveBeenCalled();
            expect(spyOnError.mock.calls.length).toBe(3);

            expect(spyOnError.mock.calls[0][invalidPropIndex]).toContain('The prop `id` is marked as required in `WebtrekkProductData`, but its value is `null`');
            expect(spyOnError.mock.calls[1][invalidPropIndex]).toContain('The prop `action` is marked as required in `WebtrekkProductData`, but its value is `null`');
        });

        test('don\'t returns children', () => {
            const renderedWebtrekkProductData = shallow(<WebtrekkProductData/>);
            expect(renderedWebtrekkProductData).toEqual({});
        });
    });

    describe('full rendering', () => {
        beforeEach((done) => {
            WebtrekkSmartPixelReact.call(() => {
                spyOnError = jest.spyOn(console, 'error').mockImplementation(() => {
                });
                done();
            });
        });

        afterEach((done) => {
            WebtrekkSmartPixelReact.call((wtSmart) => {
                wtSmart.product.view.data.remove();

                spyOnError.mockRestore();
                spyOnError = null;

                done();
            });
        });

        test('mount product view', (done) => {
            mount(<WebtrekkProductData
                id="product id 1"
                action="view"
                cost={19.95}
                quantity={1}
                variant="product variant"
                soldOut={false}
                category={{1: 'category-1', 5: 'category-5'}}
                parameter={{1: 'parameter-1', 7: 'parameter-7'}}
            />);

            WebtrekkSmartPixelReact.call((wtSmart) => {
                expectInCallback(() => {
                    const orderData = wtSmart.product.view.data.get()[0];
                    expect(orderData.id).toBe('product id 1');
                    expect(orderData.cost).toBe(19.95);
                    expect(orderData.quantity).toBe(1);
                    expect(orderData.variant).toBe('product variant');
                    expect(orderData.soldOut).toBe(false);
                    expect(orderData.category).toEqual({1: 'category-1', 5: 'category-5'});
                    expect(orderData.parameter).toEqual({1: 'parameter-1', 7: 'parameter-7'});
                }, done);
            });
        });

        test('mount product confirmation', (done) => {
            mount(<WebtrekkProductData
                id="product id 1"
                action="confirmation"
                cost={19.95}
                quantity={1}
                variant="product variant"
                soldOut={false}
                category={{1: 'category-1', 5: 'category-5'}}
                parameter={{1: 'parameter-1', 7: 'parameter-7'}}
            />);

            WebtrekkSmartPixelReact.call((wtSmart) => {
                expectInCallback(() => {
                    const orderData = wtSmart.product.confirmation.data.get()[0];
                    expect(orderData.id).toBe('product id 1');
                    expect(orderData.cost).toBe(19.95);
                    expect(orderData.quantity).toBe(1);
                    expect(orderData.variant).toBe('product variant');
                    expect(orderData.soldOut).toBe(false);
                    expect(orderData.category).toEqual({1: 'category-1', 5: 'category-5'});
                    expect(orderData.parameter).toEqual({1: 'parameter-1', 7: 'parameter-7'});
                }, done);
            });
        });

        test('update product view', (done) => {
            renderedWebtrekkProductData = mount(<WebtrekkProductData
                id="product id 1"
                action="view"
                cost={19.95}
                quantity={1}
                variant="product variant"
                soldOut={false}
                category={{1: 'category-1', 5: 'category-5'}}
                parameter={{1: 'parameter-1', 7: 'parameter-7'}}
            />);

            renderedWebtrekkProductData.setProps({
                id: 'A-123456789',
                quantity: 7
            });

            WebtrekkSmartPixelReact.call((wtSmart) => {
                expectInCallback(() => {
                    let orderData = wtSmart.product.view.data.get()[0];
                    expect(orderData.id).toBe('A-123456789');
                    expect(orderData.cost).toBe(19.95);
                    expect(orderData.quantity).toBe(7);
                    expect(orderData.variant).toBe('product variant');
                    expect(orderData.soldOut).toBe(false);
                    expect(orderData.category).toEqual({1: 'category-1', 5: 'category-5'});
                    expect(orderData.parameter).toEqual({1: 'parameter-1', 7: 'parameter-7'});
                }, done);
            });
        });
    });
});
