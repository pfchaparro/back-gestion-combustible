'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('taxes', [
      {
        name: 'INGRESO AL PRODUCTOR',
        description: null,
        order: 1,
        status_id: 1
      },
      {
        name: 'IVA INGRESO PRODUCTOR (IVA 5% POR CADA GALON)',
        description: null,
        order: 2,
        status_id: 1
      },
      {
        name: 'MARGEN PLAN CONTINUIDAD',
        description: null,
        order: 3,
        status_id: 1
      },
      {
        name: 'TARIFA MARCACIÓN',
        description: null,
        order: 4,
        status_id: 1
      },
      {
        name: 'TARIFA DE ESTAMPILLA DE TRANSPORTE COMBUSTIBLE',
        description: null,
        order: 5,
        status_id: 1
      },
      {
        name: 'PRECIO COMPRA ECOPETROL',
        description: null,
        order: 6,
        status_id: 1
      },
      {
        name: 'IMPUESTO NACIONAL',
        description: null,
        order: 7,
        status_id: 1
      },
      {
        name: 'IMPUESTO CARBONO',
        description: null,
        order: 8,
        status_id: 1
      },
      {
        name: 'COSTO EN PLANTA DE ABASTO',
        description: null,
        order: 9,
        status_id: 1
      },
      {
        name: 'MARGEN MAYORISTA',
        description: null,
        order: 10,
        status_id: 1
      },
      {
        name: 'IVA MARGEN MAYORISTA (IVA 19% POR CADA GALON)',
        description: null,
        order: 11,
        status_id: 1
      },
      {
        name: 'MARGEN DYNAMAX',
        description: null,
        order: 12,
        status_id: 1
      },
      {
        name: 'PRECIO DE VENTA PLANTA ABASTO',
        description: null,
        order: 13,
        status_id: 1
      },
      {
        name: 'PRECIO DE VENTA PLANTA ABASTO (SIN IMPTO NAC.)',
        description: null,
        order: 14,
        status_id: 1
      },
      {
        name: 'MARGEN MINORISTA',
        description: null,
        order: 15,
        status_id: 1
      },
      {
        name: 'PERDIDA POR EVAPORACIÓN MANEJO Y TRANSPORTE',
        description: null,
        order: 16,
        status_id: 1
      },
      {
        name: 'TRANS. PLANTA - EDS',
        description: null,
        order: 17,
        status_id: 1
      },
      {
        name: 'SOLDICOM $COP',
        description: null,
        order: 18,
        status_id: 1
      },
      {
        name: 'PRECIO AL PÚBLICO EN SURTIDOR (SIN SOBRETASA)',
        description: null,
        order: 19,
        status_id: 1
      },
      {
        name: 'SOBRETASA GASOLINA - DIESEL',
        description: null,
        order: 20,
        status_id: 1
      },
      {
        name: 'SOBRETASA MUNICIPIO',
        description: null,
        order: 21,
        status_id: 1
      },
      {
        name: 'SOBRETASA DEPARTAMENTO',
        description: null,
        order: 22,
        status_id: 1
      },
      {
        name: 'SOBRETASA NACIONAL',
        description: null,
        order: 23,
        status_id: 1
      },
      {
        name: 'PRECIO SUGERIDO AL PÚBLICO',
        description: null,
        order: 24,
        status_id: 1
      },
      {
        name: 'PRECIO SUGERIDO AL PÚBLICO MES ANTERIOR',
        description: null,
        order: 25,
        status_id: 1
      },
      {
        name: 'VARIACIÓN ABSOLUTA ($COP)',
        description: null,
        order: 26,
        status_id: 1
      },
      {
        name: 'VARIACIÓN RELATIVA (%)',
        description: null,
        order: 27,
        status_id: 1
      },
      {
        name: 'PRECIO DE VENTA EN PLANTA ABASTO',
        description: null,
        order: 28,
        status_id: 1
      },
      {
        name: 'PRECIO DE VENTA EN PLANTA ABASTO MES ANTERIOR',
        description: null,
        order: 29,
        status_id: 1
      },
      {
        name: 'VARIACIÓN ABSOLUTA ($COP)',
        description: null,
        order: 30,
        status_id: 1
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('taxes', null, {});
  }
};