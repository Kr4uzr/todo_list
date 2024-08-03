using System.Text.Json.Serialization;

namespace todo_list.Enums {

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TaskEnum {
        Novo,
        Fazendo,
        Feito,
    }
}