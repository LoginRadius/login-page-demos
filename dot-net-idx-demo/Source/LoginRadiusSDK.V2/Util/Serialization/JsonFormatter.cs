﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;

namespace LoginRadiusSDK.V2.Util.Serialization
{
    /// <summary>
    /// Event arguments for when an error is encountered while deserializing a JSON string.
    /// </summary>
    public class JsonFormatterDeserializationErrorEventArgs : EventArgs
    {
        /// <summary>
        /// Gets or sets the error message associated with this event.
        /// </summary>
        public string Message { get; set; }
    }

    /// <summary>
    /// Event handler delegate for when an error is encountered while deserializing a JSON string.
    /// </summary>
    /// <param name="e"></param>
    public delegate void JsonFormatterDeserializationErrorEventHandler(JsonFormatterDeserializationErrorEventArgs e);

    /// <summary>
    /// Helper class that handles serializing and deserializing to and from JSON strings, respectively.
    /// </summary>
    public static class JsonFormatter
    {
        /// <summary>
        /// Event handler for when an error occurs while attempting to deserialize a JSON string.
        /// </summary>
        public static event JsonFormatterDeserializationErrorEventHandler DeserializationError;

        /// <summary>
        /// Converts the specified object to a JSON string.
        /// </summary>
        /// <typeparam name="T">A JSON-serializable object type.</typeparam>
        /// <param name="t">The object to be serialized.</param>
        /// <returns>A JSON string representing the specified object.</returns>
        public static string ConvertToJson<T>(T t)
        {
            return JsonConvert.SerializeObject(t,
                new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
        }

        public static string ConvertToJson(object t)
        {
            return ConvertToJson<object>(t);
        }

        /// <summary>
        /// Converts the specified JSON string to the specified object.
        /// </summary>
        /// <typeparam name="T">The object type to which the JSON string will be deserialized.</typeparam>
        /// <param name="value">A JSON string.</param>
        /// <returns>An object containing the data from the JSON string.</returns>
        public static T ConvertFromJson<T>(string value)
        {
            return JsonConvert.DeserializeObject<T>(value, new JsonSerializerSettings
            {
                MissingMemberHandling = MissingMemberHandling.Error,
                Error = ErrorHandler
            });
        }

        /// <summary>
        /// Error handler for errors encountered while attempting to deserialize a JSON string.
        /// </summary>
        /// <param name="sender">Object that sent the event</param>
        /// <param name="e">Event arguments</param>
        private static void ErrorHandler(object sender, ErrorEventArgs e)
        {
            e.ErrorContext.Handled = e.CurrentObject != null;

            // Raise the event if any other object has subscribed to this error.
            var handler = DeserializationError;
            handler?.Invoke(new JsonFormatterDeserializationErrorEventArgs { Message = e.ErrorContext.Error.Message });
        }

        /// <summary>
        /// This function will be used to validate the Json Data into the string and return true if the string contains Json data.
        /// </summary>
        /// <param name="s">Json String</param>
        
        public static bool ValidateJSON(this string s)
        {
            try
            {
                JToken.Parse(s);
                return true;
            }
            catch (JsonReaderException ex)
            {

                return false;
            }
        }
    }
}