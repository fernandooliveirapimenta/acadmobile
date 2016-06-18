function getAgendados(){
  this.agendados=[];

   var agendamentos = localStorage.getItem("agendados");

   if(agendamentos !== null)
      this.agendados = angular.fromJson(agendamentos);

      this.getAgendamentos = function(){
            var agenda = [];
           var agendamentos = localStorage.getItem("agendados");
           if(agendamentos !== null){
             agenda = angular.fromJson(agendamentos);
           }

           return agenda;
      }

  this.save = function(){
    var agendamentos = angular.toJson(this.agendados);
    localStorage.setItem("agendados",agendamentos);
  };

  this.remove = function(IdUsuario,evento){
    var agendamento = this.find(IdUsuario, evento);
    var retorno = false;
    if(agendamento !== null){
    var pos = this.agendados.indexOf(agendamento);
    this.agendados.splice(pos,1);
    this.save();
    retorno = true;
  }
  return retorno;
  };


  this.add= function(agendamento){
    var flag = this.find(agendamento.IdUsuario, agendamento.evento);
    var retorno = false;
    if(flag === null){
      this.agendados.push(agendamento);
      this.save();
      retorno = true;
    }
    return retorno;
  };

  this.find = function(IdUsuario,evento){
    var retorno = null;
      angular.forEach(this.getAgendamentos(), function(agendamento) {
           if(agendamento !== null && agendamento.IdUsuario ==IdUsuario && agendamento.evento.IdEvento == evento.IdEvento)
             retorno = agendamento;
    });

    return retorno;
  }

}
