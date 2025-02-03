// Aguarda o DOM ser carregado para iniciar a execução
document.addEventListener("DOMContentLoaded", function() {

    // Inicializa o mapa usando CRS Simple
    var map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2
    });
  
    // Define a URL da imagem de fundo
    var imageUrl = 'Hyperion-BR.png';  // Certifique-se de que o arquivo está no caminho correto
    // Para uma imagem de 1536 de largura e 888 de altura, no CRS Simple os bounds devem ser [0,0] até [altura, largura]
    var imageBounds = [[0, 0], [888, 1536]];  // [altura, largura]
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
  
    // Centraliza o mapa no meio da imagem: [888/2, 1536/2] = [444, 768]
    map.setView([444, 768], 0);
  
    /* 
      Define os arrays de castelos organizados por nível:
      
      Castelos level 15: Liege, Peltier, Aris, Chatelie.
      Castelos level 30: Gideon, Feoff, Latour, Cablac, Eikum Kas, Sabulat, Triumphaler, Ionat, Blessendour, Devanagary.
      Castelos level 45: Ammalaelle, Tyanod, Temoval, Kare Royal, Diffensat.
    */
    var castelos15 = [
      { nome: 'Liege', pos: [852, 462] },
      { nome: 'Peltier', pos: [671.5, 513.5] },
      { nome: 'Aris', pos: [1054, 694] },
      { nome: 'Chatelie', pos: [604, 263] }
    ];
  
    var castelos30 = [
      { nome: 'Gideon', pos: [394, 151] },
      { nome: 'Feoff', pos: [791, 594] },
      { nome: 'Latour', pos: [1156, 456] },
      { nome: 'Cablac', pos: [1039, 384] },
      { nome: 'Eikum Kas', pos: [928, 343] },
      { nome: 'Sabulat', pos: [468, 301] },
      { nome: 'Triumphaler', pos: [333, 364] },
      { nome: 'Ionat', pos: [368, 747] },
      { nome: 'Blessendour', pos: [132, 484] },
      { nome: 'Devanagary', pos: [505, 561] }
    ];
  
    var castelos45 = [
      { nome: 'Ammalaelle', pos: [913, 151] },
      { nome: 'Tyanod', pos: [1343, 762] },
      { nome: 'Temoval', pos: [997, 840] },
      { nome: 'Kare Royal', pos: [552, 786] },
      { nome: 'Diffensat', pos: [77, 103] }
    ];
  
    // Cria uma camada (layer group) para agrupar os marcadores dos castelos
    var castleLayer = L.layerGroup().addTo(map);
  
    // Função que cria um ícone de castelo com o tamanho desejado
    function createCastleIcon(size) {
      return L.icon({
        iconUrl: 'Ico/Castelo.png',  // Certifique-se de que o arquivo está no caminho correto
        iconSize: [size, size],
        iconAnchor: [size / 2, size]  // Centraliza a âncora na base do ícone
      });
    }
  
    // Função que limpa a camada atual e adiciona os marcadores do grupo selecionado
    function addCastelos(size, castelosArray) {
      castleLayer.clearLayers();
      var icon = createCastleIcon(size);
      castelosArray.forEach(function(castelo) {
        var marker = L.marker(castelo.pos, { icon: icon });
        marker.bindTooltip(
          '<span class="castle-label">' + castelo.nome + '</span>',
          {
            permanent: true,
            direction: 'bottom',
            offset: [0, 10],
            className: 'castle-label'
          }
        );
        castleLayer.addLayer(marker);
      });
    }
  
    // Função que atualiza os castelos conforme o nível selecionado
    function updateCastelos(level) {
      if (level === 15) {
        addCastelos(15, castelos15);
      } else if (level === 30) {
        addCastelos(30, castelos30);
      } else if (level === 45) {
        addCastelos(45, castelos45);
      }
      console.log("Castelos atualizados para nível: " + level);
    }
  
    // Exibe inicialmente os castelos do nível 30 (pode ser alterado conforme sua preferência)
    updateCastelos(30);
  
    // Vincula os eventos de clique dos itens do painel para atualizar o mapa
    document.getElementById("castelos15").addEventListener("click", function() {
      updateCastelos(15);
    });
    document.getElementById("castelos30").addEventListener("click", function() {
      updateCastelos(30);
    });
    document.getElementById("castelos45").addEventListener("click", function() {
      updateCastelos(45);
    });
  });
  